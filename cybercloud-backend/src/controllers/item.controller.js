const itemCtrl = {};

const Item = require ('../models/Item');
const Itembag = require('../models/itembag');

itemCtrl.getItems = async(req,res)=> {
    try {
        const items = await Item.find();
        return res.json(items)
    } catch (error) {
        return res.status(400).send({status:false, error: err});
    }
    
}
itemCtrl.createItem = async (req,res)=> {
    const { description, price, service, image} = req.body;
    const newItem = new Item({
        description,
        price,
        service,
        image
    }); 
    try {
        await newItem.save();
        return res.send({status:true})
    } catch (error) {
        return res.status(400).send({status:false, error: err});
    }
    
}
itemCtrl.deleteItem = async (req,res)=> {
    try {
        await Item.findByIdAndDelete(req.params.id)
        await Itembag.deleteMany();
        return res.send({status:true})
    } catch (error) {
        return res.status(400).send({status:false, error: err});
    }
    
}
itemCtrl.getItem = async(req,res)=> {
}
itemCtrl.updateItem = async(req,res)=> {
}

module.exports = itemCtrl;