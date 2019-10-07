const rateCtrl = {};

const Rate = require('../models/Rate');

rateCtrl.getRates = async(req,res)=> {
    const rates = await Rate.find();
    res.json(rates)
}
rateCtrl.createRate = async (req,res)=> {
    const { name, interval} = req.body;
    console.log(interval)
    const newRate = new Rate({
        name,
        interval
    }); 
    console.log(newRate)
    await newRate.save();
    res.send("Terminal saved")
}
rateCtrl.deleteRate = async (req,res)=> {
}
rateCtrl.getRate = async(req,res)=> {
}
rateCtrl.updateRate = async(req,res)=> {
}

module.exports = rateCtrl;