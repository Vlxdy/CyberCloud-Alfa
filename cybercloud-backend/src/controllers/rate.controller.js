const rateCtrl = {};
const Rate = require('../models/Rate');
const Interval = require('../models/Interval')
rateCtrl.getRates = async (req, res) => {
    try {
        const rates = await Rate.find();
        return res.json(rates)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
rateCtrl.createRate = async (req, res) => {
    try {
        const { name } = req.body;
        const interval = await Interval.find()
        //console.log(interval)
        //console.log(req.body)
        if (interval.length>0 && name!="") {
            const ListInterval = [];
        for (let index = 0; index < interval.length; index++) {
            //console.log(interval[index].time)
            ListInterval.push({
                time: interval[index].time,
                cost: interval[index].price
            });
        };
        console.log(ListInterval)
        const newRate = new Rate({
            name,
            interval: ListInterval
        });
        await newRate.save();
        await Interval.deleteMany();
        return res.send({status: true});
        }else{
            return res.status(400).send({status: false});
        }
        
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
rateCtrl.deleteRate = async (req, res) => {
    try {
        await Rate.findByIdAndDelete(req.params.id)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
rateCtrl.getRate = async (req, res) => {
    try {
        await Rate.findById(req.params.id)
        return res.status(200).send({ status: true });
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
rateCtrl.updateRate = async (req, res) => {
    try {
        await Rate.findByIdAndUpdate(req.params.id, { "name": req.body.name, "interval": req.body.interval });
        return res.status(200).send({status: true})
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
module.exports = rateCtrl;