const authCtrl = {};

const auth = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Recharge = require('../models/Recharge');
const Rate = require('../models/Rate');
const Terminal = require('../models/Terminal');

authCtrl.getAuths = async (req, res) => {
    try {
        const auths = await auth.find();
        const users = []
        for (let index = 0; index < auths.length; index++) {
            users.push({
                _id: auths[index]._id,
                name: auths[index].name,
                permissions: auths[index].permissions,
                money: auths[index].money,
                phone: auths[index].phone,
                email: auths[index].email
            });
        }
        res.json(users)
    } catch (error) {
        res.status(400).send(error)
    }

}
authCtrl.createAuth = async (req, res) => {
    console.log("entra")
    const { name, phone, email, password } = req.body;
    //checking if the user is already in the database
    const emailExist = await auth.findOne({ email: email });
    if (emailExist) return res.status(400).send('Email already exists');
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newAuth = new auth({
        name,
        phone,
        email,
        password: hashPassword
    });
    console.log(newAuth)
    try {
        await newAuth.save();
        res.send({ status: "created" });
    } catch (err) {
        res.status(400).send(err);
    }
}
authCtrl.signIn = async (req, res) => {
    //lets validate the data before we a user
    //const {error } = loginValidation(req.body)
    //if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    try {
        const user = await auth.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email is not found');
        //password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password)
        //console.log(req.body.password)
        //console.log(user.password)
        if (!validPass) return res.status(400).send('Invalid password');
        //create and assign a token
        const token = jwt.sign({ _id: user._id, permissions: user.permissions }, process.env.TOKEN_SECRET);
        //console.log(user)
        //res.header('access-token', token).send(token);
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                permissions: user.permissions,
                money: user.money
            }

        })
    } catch (error) {
        return res.status(500).send(error)
    }
}
authCtrl.deleteAuth = async (req, res) => {
}
authCtrl.getAuth = async (req, res) => {
    try {
        const user = await auth.findById(req.params.id);
        const recharges = await Recharge.find({ user_id: req.params.id })
        recharges.reverse();
        return res.json({ user, recharges })
    } catch (error) {
        return res.status(500).send(error)
    }
}
authCtrl.updateAuth = async (req, res) => {
}
authCtrl.updatePermissions = async (req, res) => {
    //const terminal = await Terminal.findById(req.params.id);
    try {
        //const user = await auth.findById(req.body.id);
        //console.log(req.params.id)
        //console.log(terminal)
        const resulta = await auth.updateOne(
            { _id: req.body.id }, {
            permissions: 1
        })
        const user1 = await auth.findById(req.body.id);
        res.json(user1)
    } catch (error) {
        return res.status(500).send(error)
    }

}

authCtrl.signInTerminal = async (req, res) => {
    try {
        const rate = await Rate.findById(global.setting.rate);
        //console.log(rate)
        const terminal = await Terminal.findOne({ number: req.body.terminal })
        if (terminal.times.length == 0 && terminal.using == false) {
            console.log(terminal)
            const user = await auth.findOne({ email: req.body.email });
            if (!user) return res.status(400).send('Email is not found');
            console.log(user)
            //password is correct
            const validPass = await bcrypt.compare(req.body.password, user.password)
            //console.log(req.body.password)
            //console.log(user.password)
            if (!validPass) return res.status(400).send('Invalid password');
            //create and assign a token
            const token = jwt.sign({ _id: user._id, permissions: user.permissions }, process.env.TOKEN_SECRET);
            //console.log(user)
            //res.header('access-token', token).send(token);
            if (user.money>=rate.interval[0].cost) {
                await Terminal.updateOne(
                    {number:req.body.terminal}, {
                    using: true,
                    user:{
                        id:user._id,
                        name:user.name
                    },
                    $push: {
                        times: {
                            number: terminal.number,
                            inittime: Date.now()
                        }
                    }
                });
                return res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        permissions: user.permissions,
                        money: user.money
                    }
                })
            }
            else{
                console.log(Date())
            return res.status(500).send({ error: "Credito insuficiente." })
            }
        }
        else {            
            console.log(Date())
            return res.status(500).send({ error: "Terminal Ocupada" })
        }
    } catch (error) {
        return res.status(500).send({error})
    }
}


module.exports = authCtrl;