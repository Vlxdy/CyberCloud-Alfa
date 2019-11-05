const usedterminalCtrl = {};

const UsedTerminal = require('../models/UsedTerminal');

usedterminalCtrl.getUsedTerminals = async(req,res)=> {
    try {
        const usedterminals = await UsedTerminal.find();
        return res.json(usedterminals)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
usedterminalCtrl.createUsedTerminal = async (req,res)=> {
}
usedterminalCtrl.deleteUsedTerminal = async (req,res)=> {
}
usedterminalCtrl.getUsedTerminal = async(req,res)=> {
}
usedterminalCtrl.updateUsedTerminal = async(req,res)=> {

}

module.exports = usedterminalCtrl;