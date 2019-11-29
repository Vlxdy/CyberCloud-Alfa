const userCtrl = {};

const auth = require('../models/User');
const Petitions = require('../models/Petitions');
const UsedTerminal = require('../models/UsedTerminal')
const ItemPurchased = require('../models/ItemPurchased')
const Box = require('../models/Box')
const Recharge = require('../models/Recharge')

userCtrl.getUsers = async (req, res) => {
    try {
        const auths = await auth.find();
        res.json(auths)
    } catch (error) {
        res.status(400).send(error)
    }
}
userCtrl.deleteUser = async (req, res) => {
}
userCtrl.getUser = async (req, res) => {
    try {
        const user = await auth.findById(req.params.id);
        const petitions = await Petitions.find({ user: req.params.id });
        if (user.operator) {
            if (global.setting.boxStatus) {
                const petitionsUser = await Petitions.find();
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
                const recharge = await Recharge.find({ numberBox: global.setting.numberBox });
                let userRecharge = 0;
                for (let index = 0; index < recharge.length; index++) {
                    userRecharge = userRecharge + recharge[index].amount;
                }
                //console.log(user)
                
                return res.json({
                    enabled: global.operators.has(req.params.id),
                    pstock:user.permissions[0],
                    pconfig:user.permissions[1],
                    particle:user.permissions[2],
                    poperator:user.permissions[3],
                    pgroupbox:user.permissions[4],
                    operator: user.operator,
                    money: user.money,
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    createdAt: user.createdAt,
                    petitions,
                    box: {
                        boxStatus: global.setting.boxStatus,
                        number: box.number,
                        startdate: box.startdate,
                        enddate: box.enddate,
                        itemPrice,
                        terminalPrice,
                        userRecharge
                    },
                    petitionsUser
                });
            }
            else {
                const petitionsUser = await Petitions.find();
                return res.json({
                    enabled: global.operators.has(req.params.id),
                    pstock:user.permissions[0],
                    pconfig:user.permissions[1],
                    particle:user.permissions[2],
                    poperator:user.permissions[3],
                    pgroupbox:user.permissions[4],
                    operator: user.operator,
                    money: user.money,
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    createdAt: user.createdAt,
                    petitions,
                    box: {
                        boxStatus: global.setting.boxStatus,
                        number: global.setting.numberBox,
                    },
                    petitionsUser
                });
            }

        }
        else {
            return res.json({
                money: user.money,
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                createdAt: user.createdAt,
                petitions,
                box: {
                    number: 0,
                    startdate: "",
                    enddate: "",
                    itemPrice: 0,
                    terminalPrice: 0,
                    userRecharge: 0
                },
                petitionsUser: []
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
userCtrl.updateUser = async (req, res) => {
}

module.exports = userCtrl;