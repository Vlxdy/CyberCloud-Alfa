const itemCtrl = {};

const Item = require ('../models/Item');
const Itembag = require('../models/itembag');

itemCtrl.getItems = async(req,res)=> {
    try {
        const items = await Item.find();
        return res.json(items)
    } catch (error) {
        return res.status(400).send({status:false, error});
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
        return res.status(400).send({status:false, error});
    }
    
}
itemCtrl.deleteItem = async (req,res)=> {
    try {
        await Item.findByIdAndDelete(req.params.id)
        await Itembag.deleteMany();
        return res.send({status:true})
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
itemCtrl.getItem = async(req,res)=> {
}
itemCtrl.updateItem = async(req,res)=> {
    try {
        const { description, price, service, image} = req.body;
        /*const item = await Item.findById(req.params.id);
        await Itembag.updateOne({_id:req.params.id},{
            available: !item.available
        });*/
        const resp = await Item.updateOne({_id:req.params.id},{
            description,
            price,
            service,
            image
        });
        return res.send(resp);
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
itemCtrl.patchItem = async(req,res)=>{
    try {
        const item = await Item.findById(req.params.id);
        //console.log(item)
        const resp = await Item.updateOne({_id:req.params.id},{
            available: !item.available
        });
        return res.send(resp)
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}

module.exports = itemCtrl;