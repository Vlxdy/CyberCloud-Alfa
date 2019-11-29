const stockCtrl = {};

const Item = require ('../models/Item');
const Stock = require('../models/Stock');
const User = require('../models/User');

stockCtrl.getStocks = async(req,res)=> {
    try {
        const items = await Item.find();
        return res.json(items)
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
stockCtrl.createStock = async (req,res)=> {
    try {
        const user = await User.findById(req.body.operator);
        const item = await Item.findById(req.body.article);
        if(user && item && parseInt(req.body.amount)>0){
            await Item.updateOne({_id:item._id},{
                amount: item.amount+parseInt(req.body.amount)
            });
            const newStock = new Stock({
                operador:user._id,
                amount: req.body.amount,
                article: req.body.article
            });
            await newStock.save();
        }
        return res.send({status:true})
    } catch (error) {
        console.log(error)
        return res.status(400).send({status:false, error});
    }
}
stockCtrl.deleteStock = async (req,res)=> {
    try {
        return res.send({status:true})
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
stockCtrl.getStock = async(req,res)=> {
}
stockCtrl.updateStock = async(req,res)=> {
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
stockCtrl.patchStock = async(req,res)=>{
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
module.exports = stockCtrl;