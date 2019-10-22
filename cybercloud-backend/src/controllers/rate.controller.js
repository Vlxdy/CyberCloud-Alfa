const rateCtrl = {};

const Rate = require('../models/Rate');

rateCtrl.getRates = async (req, res) => {
    try {
        const rates = await Rate.find();
        return res.json(rates)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
rateCtrl.createRate = async (req, res) => {
    try {
        const { name, interval } = req.body;
        const newRate = new Rate({
            name,
            interval
        });
        await newRate.save();
        return res.send({status: true});
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}
rateCtrl.deleteRate = async (req, res) => {
}
rateCtrl.getRate = async (req, res) => {
}
rateCtrl.updateRate = async (req, res) => {
}

module.exports = rateCtrl;