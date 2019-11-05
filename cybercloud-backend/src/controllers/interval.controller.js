const intervalCtrl = {};

const Interval = require('../models/Interval');

intervalCtrl.getInterval = async(req,res)=> {
    try {
        const interval = await Interval.find();
        return res.status(200).json(interval);
    } catch (error) {
        return res.status(400).send(error);
    }
}
intervalCtrl.createInterval = async (req,res)=> {
    try { 
        const { time, price } = req.body;
        const newInterval = new Interval({
            time, price
        });
        await newInterval.save();
        return res.send({status:true})
    } catch (err) {
        return res.status(400).send({status:false, error: err});
    }
}
intervalCtrl.deleteInterval = async (req,res)=> {
    try {
        await Interval.findByIdAndDelete(req.params.id)
        return res.send({status:true})   
    } catch (error) {
        return res.status(400).send({ status:false, error });
    }
}
intervalCtrl.deleteIntervals = async (req,res)=> {
    try {
        await Interval.deleteMany();
        return res.send({status:true})    
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
module.exports = intervalCtrl;