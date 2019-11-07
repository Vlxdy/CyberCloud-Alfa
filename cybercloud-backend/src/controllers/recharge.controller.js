const rechargeCtrl = {};

const Recharge = require('../models/Recharge');
const User = require('../models/User');

rechargeCtrl.getRecharges = async(req,res)=> {
    try {
        const recharges = await Recharge.find();
        return res.json(recharges);
    } catch (error) {
        return res.json(error);
    }
}
rechargeCtrl.createRecharge = async (req,res)=> {
    try {
        const newRecharge = new Recharge({
            user_id: req.body.user_id,
            operator_id: req.body.operator_id,
            amount: parseFloat((parseFloat(req.body.amount)).toFixed(2)),
            numberBox:global.setting.numberBox
        });
        const user = await User.findById(req.body.user_id);
        //console.log(user.money+parseFloat(req.body.amount))
        await User.findByIdAndUpdate(req.body.user_id,{
            money:parseFloat((user.money+parseFloat(req.body.amount)).toFixed(2))
        })
        await newRecharge.save();
        return res.json({state:true});
    } catch (error) {
        //console.log(error);
        return res.send(error)
    }
}
rechargeCtrl.deleteRecharge = async (req,res)=> {
}
rechargeCtrl.getRecharge = async(req,res)=> {
    try {
        const recharges = await Recharge.find({ numberBox: req.params.id });
        return res.json(recharges);
    } catch (error) {
        return res.json(error);
    }
}
rechargeCtrl.updateRecharge = async(req,res)=> {
}

module.exports = rechargeCtrl;