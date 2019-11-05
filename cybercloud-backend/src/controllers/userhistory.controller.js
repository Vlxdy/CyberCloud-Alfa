const userhistoryCtrl = {};

const UsedTerminal = require('../models/UsedTerminal');
const ItemPurchased = require('../models/ItemPurchased');
const Rate = require('../models/Rate');

userhistoryCtrl.getUserHistories = async (req, res) => {

}
userhistoryCtrl.createUserHistory = async (req, res) => {
}
userhistoryCtrl.deleteUserHistory = async (req, res) => {
}
userhistoryCtrl.getUserHistory = async (req, res) => {
    try {
        const itempurchased = await ItemPurchased.find({ user: req.params.id });
        itempurchased.reverse();
        const TerminalsUsed = [];
        const usedterminals = await UsedTerminal.find({ "user.id": req.params.id })
        for (let index = 0; index < usedterminals.length; index++) {
            let time = 0;
            if (usedterminals[index].terminals.length > 0) {
                for (let i = 0; i < usedterminals[index].terminals.length; i++) {
                    time = time + Date.parse(usedterminals[index].terminals[i].endtime) - Date.parse(usedterminals[index].terminals[i].inittime);
                }
            }
            const rate = await Rate.findById(usedterminals[index].rate)
            TerminalsUsed.push({
                operator:usedterminals[index].operator,
                numberBox: usedterminals[index].numberBox,
                terminals: usedterminals[index].terminals,
                price: usedterminals[index].price,
                rate: rate,
                time,
                createdAt: usedterminals[index].createdAt,
                _id:usedterminals[index]._id
            })
        }
        TerminalsUsed.reverse();
        return res.json({ itempurchased, TerminalsUsed })
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
userhistoryCtrl.updateUserHistory = async (req, res) => {
}

module.exports = userhistoryCtrl;