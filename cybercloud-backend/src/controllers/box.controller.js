const boxCtrl = {};

const Box = require('../models/Box');
const OperatorGroup = require('../models/OperatorGroup');

const Setting = require('../models/Settings');

const ItemPurchased = require('../models/ItemPurchased');
const UsedTerminal = require('../models/UsedTerminal');
const { getSettings, setSettings } = require('../settings');
boxCtrl.getBoxs = async (req, res) => {
    try {
        const box = await Box.find();
        let boxes = [];
        for (let index = 0; index < box.length; index++) {
            
            const group = await OperatorGroup.findById(box[index].group);
            //console.log(group?group.name:"")
            boxes.push({
                calendar: box[index].calendar,
                used: box[index].used,
                _id: box[index]._id,
                number: box[index].number,
                group: box[index].group,
                namegroup: group?group.name:""
            });
        }
        return res.status(200).json(boxes)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.createBox = async (req, res) => {
    try {
        //console.log(req.body)
        const boxes = await Box.find();
        const newbox = new Box({
            number:boxes[boxes.length-1].number+1,
            group:req.body.group,
            calendar:{
                init:req.body.startDate,
                end:req.body.endDate
            }
        })
        const result = newbox.save();
        return res.status(200).json(boxes);
    } catch (error) {
        return res.status(400).send({ error });
    }
}
boxCtrl.getBox = async (req, res) => {
    try {
        const box = await Box.findOne({ number: req.params.id });
        const itempurchased = await ItemPurchased.find({ numberBox: req.params.id })
        const usedterminal = await UsedTerminal.find({ numberBox: req.params.id })
        let itemPrice = 0;
        for (let index = 0; index < itempurchased.length; index++) {
            itemPrice = itemPrice + (itempurchased[index].price * itempurchased[index].amount);
        }
        let terminalPrice = 0;
        for (let index = 0; index < usedterminal.length; index++) {
            terminalPrice = terminalPrice + (usedterminal[index].price);
        }
        return res.status(200).json({
            number: box.number,
            startdate: box.startdate,
            enddate: box.enddate,
            itemPrice,
            terminalPrice
        });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.deleteBox = async (req, res) => {
    try {
        const box = await Box.findOne({ number: global.setting.numberBox });
        const itempurchased = await ItemPurchased.find({ numberBox: global.setting.numberBox })
        const usedterminal = await UsedTerminal.find({ numberBox: global.setting.numberBox })
        let itemPrice = 0;
        for (let index = 0; index < itempurchased.length; index++) {
            if (itempurchased[index].user == "anonymous") { itemPrice = itemPrice + (itempurchased[index].price * itempurchased[index].amount); }
        }
        let terminalPrice = 0;
        for (let index = 0; index < usedterminal.length; index++) {
            if (usedterminal[index].user.id == "0") { terminalPrice = terminalPrice + (usedterminal[index].price); }
        }
        return res.status(200).json({
            number: box.number,
            startdate: box.startdate,
            enddate: box.enddate,
            itemPrice,
            terminalPrice
        });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.updateBoxes = async (req, res) => {
    try {
        if (global.setting.boxStatus) {
            const conf = await Setting.find();
            await Box.updateOne({ number: global.setting.numberBox }, { enddate: Date.now() });
            await Setting.findByIdAndUpdate(conf[0]._id, { boxStatus: false, numberBox: global.setting.numberBox + 1});
        }
        else{
            const box = await Box.findOne({number: global.setting.numberBox});
            if(box){
            const conf = await Setting.find();
            await Box.updateOne({number: global.setting.numberBox},{
                startdate: Date.now(),
                used:true
            });
            await Setting.findByIdAndUpdate(conf[0]._id, { boxStatus: true})
            }
        }
        getSettings();
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
boxCtrl.updateBox = async (req, res) => {
    try {
        //console.log(req.body)
        const resp = await Box.updateOne({number:req.params.id},{
            group:req.body.group,
            calendar:{
                init:req.body.startDate,
                end:req.body.endDate
            }
        });
        return res.status(200).json(resp);
    } catch (error) {
        return res.status(400).send({ error });
    }
}
boxCtrl.patchBox = async (req, res) => {

}

module.exports = boxCtrl;