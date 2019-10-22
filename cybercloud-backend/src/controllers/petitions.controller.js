const petitionsCtrl = {};

const Petitions = require('../models/Petitions');

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
        const { user,terminal, items, username} = req.body;
        let cost = 0;
        for (let index = 0; index < items.length; index++) {
            cost = cost + (items[index].amount*items[index].price);
        }
        const newPetition = new Petitions({
            user,
            terminal,
            items,
            cost,
            username
        });
        await newPetition.save();
        return res.send({status: true});
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error: err });
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
        const result = await Petitions.findByIdAndDelete(req.params.id);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).send(error)
    }
}
petitionsCtrl.getPetition = async(req,res)=> {
}
petitionsCtrl.updatePetitions = async(req,res)=> {
    try {
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).send(error)
    }
}
module.exports = petitionsCtrl;