const itempurchasedCtrl = {};

const ItemPurchased = require('../models/ItemPurchased');

itempurchasedCtrl.getItemsPurchased = async(req,res)=> {
    try {
        const itemP = await ItemPurchased.find()
        return res.status(200).send(itemP)
    } catch (error) {
        return res.status(400).send(error)
    }
}
itempurchasedCtrl.getItemPurchased = async(req,res)=> {
    try {
        const itemP = await ItemPurchased.findById(req.params.id)
        return res.status(200).send(itemP)
    } catch (error) {
        return res.status(400).send(error)
    }
}
itempurchasedCtrl.createItemPurchased = async (req,res)=> {
    try {
        const {items, user, username, operator, operatorname} = req.body;
        console.log(req.body)
        for (let index = 0; index < items.length; index++) {
            const newItemP = new ItemPurchased({
                id_item: items[index]._id,
                description: items[index].description,
                price: items[index].price,
                amount: items[index].amount,
                numberBox: global.setting.numberBox,
                user,
                username,
                operator,
                operatorname
            })
            await newItemP.save();
        }
        return res.status(200).send({status:true})
    } catch (error) {
        return res.status(400).send({status:false, error})
    }
}
itempurchasedCtrl.deleteItemPurchased = async (req,res)=> {
}

itempurchasedCtrl.updateItemPurchased = async(req,res)=> {
}

module.exports = itempurchasedCtrl;