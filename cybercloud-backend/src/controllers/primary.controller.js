const primaryCtrl = {};

const Terminal = require('../models/Terminal');

primaryCtrl.getPrimaries = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        return res.json(terminals)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
primaryCtrl.createPrimary = async (req, res) => {
}
primaryCtrl.deletePrimary = async (req, res) => {
}
primaryCtrl.getPrimary = async (req, res) => {
    try {
        const terminal = await Terminal.findOne({number: req.params.id});
        return res.json(terminal)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
primaryCtrl.updatePrimary = async (req, res) => {
}

module.exports = primaryCtrl;