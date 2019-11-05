const boxCtrl = {};

const Box = require('../models/Box');
const Setting = require('../models/Settings');

const ItemPurchased = require('../models/ItemPurchased');
const UsedTerminal = require('../models/UsedTerminal');
const { getSettings, setSettings} = require('../settings');
boxCtrl.getBoxs = async(req,res)=> {
    try {
        const box = await Box.find();
        return res.status(200).json(box)    
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.createBox = async (req,res)=> {
    try {
        const conf = await Setting.find();
        
        await Box.updateOne({number:global.setting.numberBox},{enddate: Date.now()})
        const newBox = new Box({
            number: global.setting.numberBox+1,
            startdate: Date.now()            
        });
        await newBox.save();
        await Setting.findByIdAndUpdate(conf[0]._id,{numberBox:global.setting.numberBox+1})
        getSettings();
        return res.status(200).json({status:true});
    } catch (error) {
        return res.status(400).send({ error });
    }
}
boxCtrl.getBox = async(req,res)=> {
    try {
        const box = await Box.findOne({number: req.params.id});
        const itempurchased = await ItemPurchased.find({numberBox:req.params.id})
        const usedterminal = await UsedTerminal.find({numberBox: req.params.id})
        let itemPrice=0;
        for (let index = 0; index < itempurchased.length; index++) {
            itemPrice = itemPrice + (itempurchased[index].price*itempurchased[index].amount);
        }
        let terminalPrice=0;
        for (let index = 0; index < usedterminal.length; index++) {
            terminalPrice = terminalPrice + (usedterminal[index].price);
        }
        return res.status(200).json({
            number:box.number,
            startdate:box.startdate,
            enddate: box.enddate,
            itemPrice,
            terminalPrice
        });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.deleteBox = async (req,res)=> {
    try {
        const box = await Box.findOne({number: global.setting.numberBox});
        const itempurchased = await ItemPurchased.find({numberBox:global.setting.numberBox})
        const usedterminal = await UsedTerminal.find({numberBox: global.setting.numberBox})
        let itemPrice=0;
        for (let index = 0; index < itempurchased.length; index++) {
            if(itempurchased[index].user=="anonymous")
                {itemPrice = itemPrice + (itempurchased[index].price*itempurchased[index].amount);}
        }
        let terminalPrice=0;
        for (let index = 0; index < usedterminal.length; index++) {
            if(usedterminal[index].user.id=="0")
                {terminalPrice = terminalPrice + (usedterminal[index].price);}
        }
        return res.status(200).json({
            number:box.number,
            startdate:box.startdate,
            enddate: box.enddate,
            itemPrice,
            terminalPrice
        });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.updateBox = async(req,res)=> {

}

module.exports = boxCtrl;