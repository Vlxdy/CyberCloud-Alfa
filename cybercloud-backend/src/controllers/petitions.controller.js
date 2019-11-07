const petitionsCtrl = {};

const Petitions = require('../models/Petitions');
const Terminal = require('../models/Terminal')
const User = require('../models/User');
petitionsCtrl.getPetitions = async(req,res)=> {
    try {
        const petitions = await Petitions.find();
        return res.json(petitions)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
petitionsCtrl.createPetitions = async (req,res)=> {
    try {
        const { user, items, username} = req.body;
        const cuser = await User.findById(user);
        let cost = 0;
        for (let index = 0; index < items.length; index++) {
            cost = cost + (items[index].amount*items[index].price);
        }
        const terminal = await Terminal.findOne({"user.id":user});
        const newPetition = new Petitions({
            user,
            terminal:terminal?terminal.number:0,
            items,
            cost,
            username,
            time:Date.now()
        });
        if(cuser.money>=cost)
        {
            await newPetition.save();
            await User.findByIdAndUpdate(user,{
                money:parseFloat((cuser.money-cost.toFixed(2)))
            })
            return res.send({status: true});
        }
        else{
            return res.send({status: false});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error});
    }
}
petitionsCtrl.deletePetitions = async (req,res)=> {
    try {
        const result = await Petitions.deleteMany();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).send(error)
    }
}
petitionsCtrl.deletePetition = async (req,res)=> {
    try {
        const consult = await Petitions.findById(req.params.id);
        const user = await User.findById(consult.user);
        //console.log(consult.cost.toFixed(2));
        await User.findByIdAndUpdate(consult.user,{
            money:user.money+consult.cost
        })
        const result = await Petitions.findByIdAndDelete(req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).send(error)
    }
}
petitionsCtrl.getPetition = async(req,res)=> {
    try {
        const petitions = await Petitions.find({user:req.params.id});
        return res.status(200).json(petitions)
    } catch (error) {
        return res.status(400).send(error)
    }
}
petitionsCtrl.updatePetitions = async(req,res)=> {
    try {
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).send(error)
    }
}
module.exports = petitionsCtrl;