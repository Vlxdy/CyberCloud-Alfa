const itemCtrl = {};

const Item = require ('../models/Item');
const Itembag = require('../models/itembag');

itemCtrl.getItems = async(req,res)=> {
    const items = await Item.find();
    res.json(items)
}
itemCtrl.createItem = async (req,res)=> {
    const { description, price, service} = req.body;
    const newItem = new Item({
        description,
        price,
        service
    }); 
    await newItem.save();
    res.send("Item saved")
}
itemCtrl.deleteItem = async (req,res)=> {
    await Item.findByIdAndDelete(req.params.id)
    await Itembag.deleteMany();
    res.send("Item deleted")
}
itemCtrl.getItem = async(req,res)=> {
}
itemCtrl.updateItem = async(req,res)=> {
}

module.exports = itemCtrl;