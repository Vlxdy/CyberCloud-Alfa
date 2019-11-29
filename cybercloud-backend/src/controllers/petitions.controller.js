const petitionsCtrl = {};

const Petitions = require('../models/Petitions');
const Terminal = require('../models/Terminal')
const User = require('../models/User');
const Item = require('../models/Item');
petitionsCtrl.getPetitions = async(req,res)=> {
    try {
        const petitions = await Petitions.find();
        return res.json(petitions)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
verification = async (items)=>{
    console.log("-----------------")
    try {
        for (let index = 0; index < items.length; index++) {
            console.log("ebtradasd")
            const item = await Item.findById(items[index].article);
            console.log(item);
            if(item.amount<items[index].amount && (!item.available))
            {   
                return false;
            }
        }
        return true
    } catch (error) {
        return false;
    }
}
decrement = async (items)=>{
    const itemsB = []
    try {
        for (let index = 0; index < items.length; index++) {
            const item = await Item.findById(items[index].article);
            if(item.amount>=items[index].amount)
            {  
                console.log("enrtea1")
                const respon = await Item.updateOne({_id:items[index].article},{
                    amount: item.amount-items[index].amount
                });
                console.log("entr2")
                if (respon) {
                    itemsB.push(items[index]);
                }
                else{
                    console.log("Error")
                }
            }
        }
        return itemsB
    } catch (error) {
        console.log("balbla")
        return itemsB;
    }
}
petitionsCtrl.createPetitions = async (req,res)=> {
    try {
        const { user, items, username} = req.body;
        //console.log(items);
        const cuser = await User.findById(user);
        let cost = 0;
        for (let index = 0; index < items.length; index++) {
            cost = cost + (items[index].amount*items[index].price);
        }
        const terminal = await Terminal.findOne({"user.id":user});
        let verf = true;
        for (let index = 0; index < items.length; index++) {
            const item = await Item.findById(items[index].article);
            if(item.amount<items[index].amount){
                verf = false
            }
        }
        if(cuser.money>=cost && verf)
        {
            const itemsB = [];
            for (let index = 0; index < items.length; index++) {
                const item = await Item.findById(items[index].article);
                if(item.amount>=items[index].amount)
                {  
                    const respon = await Item.updateOne({_id:items[index].article},{
                        amount: item.amount-items[index].amount
                    });
                    if (respon) {
                        itemsB.push(items[index]);
                    }
                    else{
                        console.log("Error")
                    }
                }
            }

            const newPetition = new Petitions({
                user,
                terminal:terminal?terminal.number:0,
                items:itemsB,
                cost,
                username,
                time:Date.now()
            });
            await newPetition.save();
            await User.findByIdAndUpdate(user,{
                money:parseFloat((cuser.money-cost.toFixed(2)))
            })
            return res.send({status: true});
        }
        else{
            console.log("no cambia")
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
increase = async (items)=>{
    try {
        for (let index = 0; index < items.length; index++) {
            const item = await Item.findById(items[index].article);
            const respon = await Item.updateOne({_id:items[index].article},{
                amount: item.amount+items[index].amount
            });

        }

    } catch (error) {
        console.log(error);
    }
}
petitionsCtrl.deletePetition = async (req,res)=> {
    try {
        const consult = await Petitions.findById(req.params.id);
        const user = await User.findById(consult.user);
        console.log(consult);
        await increase(consult.items);
        await User.findByIdAndUpdate(consult.user,{
            money:user.money+consult.cost
        });
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