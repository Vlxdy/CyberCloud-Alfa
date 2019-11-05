const configurationCtrl = {}
const Terminal = require('../models/Terminal');
const Rate = require('../models/Rate');
const Settings = require('../models/Settings')
const { getSettings, setSettings} = require('../settings')
configurationCtrl.getConfiguration = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        const rates = await Rate.find();
        return res.json({terminals, rates, setting: global.setting})
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
configurationCtrl.updateConfiguration = async (req, res) => {
    try {
        const { name, rate } = req.body;
        const setting = await Settings.find()
        console.log(setting[0]._id)
        const setting1 = await Settings.findById(setting[0]._id)
        console.log(setting1)
        const result = await Settings.findByIdAndUpdate(setting[0]._id, {
            "name": name,
            "rate":rate
        });
        getSettings();
        return res.send(result)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
configurationCtrl.addTerminalConfiguration = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        const newTerminal = new Terminal({
            number: terminals.length+1
        });
        //console.log(newTerminal)
        await newTerminal.save();
        return res.send({ status: true })
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
configurationCtrl.deleteTerminalConfiguration = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        //console.log(newTerminal)
        await Terminal.findByIdAndDelete(terminals[terminals.length-1]._id);
        return res.send({ status: true });
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}


module.exports = configurationCtrl;