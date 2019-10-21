const authCtrl = {};

const auth = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authCtrl.getAuths = async(req,res)=> {
    try {
        const auths = await auth.find();
        res.json(auths)
    } catch (error) {
        res.status(400).send(error)
    }
    
}
authCtrl.createAuth = async (req,res)=> {
    console.log("entra")
    const { name, phone,email,password} = req.body;
    //checking if the user is already in the database
    const emailExist = await auth.findOne({email:email});
    if(emailExist) return res.status(400).send('Email already exists');
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    const newAuth = new auth({
        name,
        phone,
        email,
        password:hashPassword
    });
    console.log(newAuth)
    try {
        await newAuth.save();
        res.send({status:"created"});
    } catch (err) {
        res.status(400).send(err);
    }
}
authCtrl.signIn = async (req,res)=> {
    //lets validate the data before we a user
    //const {error } = loginValidation(req.body)
    //if(error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    try {
        const user = await auth.findOne({email:req.body.email});
    
    

    if(!user) return res.status(400).send('Email is not found');

    //password is correct
    const  validPass = await bcrypt.compare(req.body.password, user.password)
    //console.log(req.body.password)
    //console.log(user.password)
    if(!validPass) return res.status(400).send('Invalid password');

    //create and assign a token
    const token = jwt.sign({_id:user._id, permissions: user.permissions}, process.env.TOKEN_SECRET);
    //console.log(user)
    //res.header('access-token', token).send(token);
    return res.json({
        token,
        user:{
            name: user.name,
            phone: user.phone,
            email: user.email,
            permissions: user.permissions
        }

    })
    } catch (error) {
    return res.status(500).send(error)
}
}
authCtrl.deleteAuth = async (req,res)=> {
}
authCtrl.getAuth = async(req,res)=> {
}
authCtrl.updateAuth = async(req,res)=> {
}
authCtrl.updatePermissions = async(req, res)=>{
    //const terminal = await Terminal.findById(req.params.id);
    const user = await auth.findById(req.body.id);
    //console.log(req.params.id)
    //console.log(terminal)

      const resulta = await auth.updateOne(
            {_id:req.body.id},{
                permissions:1
            })
    const user1 = await auth.findById(req.body.id);
    res.json(user1)
}

module.exports = authCtrl;