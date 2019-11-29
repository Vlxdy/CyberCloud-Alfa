const registryCtrl = {};

const Box = require('../models/Box');
const ItemPurchased = require('../models/ItemPurchased');
const UsedTerminal = require('../models/UsedTerminal');
const Recharge = require('../models/Recharge');
const User = require('../models/User');
const OperatorGroup = require('../models/OperatorGroup')

registryCtrl.getRegistries = async (req, res) => {

}
registryCtrl.createRegistry = async (req, res) => {
}
registryCtrl.deleteRegistry = async (req, res) => {
    try {
        const recharge = await Recharge.find({ numberBox: req.params.id });
        let userRecharge = 0;
        console.log(recharge)
        for (let index = 0; index < recharge.length; index++) {
            userRecharge = userRecharge + recharge[index].amount;
        }
        return res.json({ userRecharge })
    } catch (error) {

    }
}
registryCtrl.getRegistry = async (req, res) => {
    try {
        const box = await Box.findOne({ number: req.params.id });
        const itempurchased = await ItemPurchased.find({ numberBox: req.params.id })
        const usedterminal = await UsedTerminal.find({ numberBox: req.params.id })
        let itemPrice = 0;
        let itemPriceUser = 0;
        let articles = [];
        for (let index = 0; index < itempurchased.length; index++) {
            let sw = true;
            for (let i = 0; i < articles.length; i++) {
                //console.log(itemPriceUser[index])
                if (articles[i].id_item == itempurchased[index].id_item) {
                    //articles[i].amount = articles[i].amount + itempurchased[index].amount;
                    if (itempurchased[index].user == "anonymous") {
                        articles[i].itemAmount = articles[i].itemAmount + itempurchased[index].amount;
                    }
                    else {
                        articles[i].itemAmountUser = articles[i].itemAmountUser + itempurchased[index].amount;
                    }
                    sw = false;
                    break;
                }
            }
            if (sw) {
                if (itempurchased[index].user == "anonymous") {
                    articles.push({
                        id_item: itempurchased[index].id_item,
                        description: itempurchased[index].description,
                        price: itempurchased[index].price,
                        itemAmount: itempurchased[index].amount,
                        itemAmountUser: 0
                    });
                }
                else {
                    articles.push({
                        id_item: itempurchased[index].id_item,
                        description: itempurchased[index].description,
                        price: itempurchased[index].price,
                        itemAmount: 0,
                        itemAmountUser: itempurchased[index].amount
                    });
                }

            }
            if (itempurchased[index].user == "anonymous") { itemPrice = itemPrice + (itempurchased[index].price * itempurchased[index].amount); }
            else {
                itemPriceUser = itemPriceUser + (itempurchased[index].price * itempurchased[index].amount);
            }
        }
        let terminalPrice = 0;
        let terminalPriceUser = 0;
        for (let index = 0; index < usedterminal.length; index++) {
            if (usedterminal[index].user.id == "0") { terminalPrice = terminalPrice + (usedterminal[index].price); }
            else {
                terminalPriceUser = terminalPriceUser + (usedterminal[index].price);
            }
        }
        const recharge = await Recharge.find({ numberBox: req.params.id });
        let recharges = [];
        let userRecharge = 0;
        //console.log(recharge)
        for (let index = 0; index < recharge.length; index++) {
            userRecharge = userRecharge + recharge[index].amount;
            const user = await User.findById(recharge[index].user_id);
            const operator = await User.findById(recharge[index].operator_id);
            recharges.push({
                recharge: recharge[index],
                user,
                operator
            });
        }
        //return res.json({respuesta, userRecharge})
        return res.status(200).json({
            number: box.number,
            startdate: box.startdate,
            enddate: box.enddate,
            articles,
            itemPrice,
            itemPriceUser,
            terminalPrice,
            terminalPriceUser,
            usedterminal,
            itempurchased,
            userRecharge,
            recharges
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
registryCtrl.patchRegistry = async (req, res) => {
    try {
        const operators = []
        const box = await Box.findOne({ number: req.params.id });
        const group = await OperatorGroup.findById(box.group)
        for (let index = 0; index < group.operator.length; index++) {
            const user = await User.findById(group.operator[index]);
            const itempurchased = await ItemPurchased.find({ numberBox: req.params.id, operator: user._id });
            const usedterminal = await UsedTerminal.find({ numberBox: req.params.id, "operator.id": user._id });
            console.log(user);
            let itemPrice = 0;
            let itemPriceUser = 0;
            let articles = [];
            for (let index = 0; index < itempurchased.length; index++) {
                let sw = true;
                for (let i = 0; i < articles.length; i++) {
                    //console.log(itemPriceUser[index])
                    if (articles[i].id_item == itempurchased[index].id_item) {
                        //articles[i].amount = articles[i].amount + itempurchased[index].amount;
                        if (itempurchased[index].user == "anonymous") {
                            articles[i].itemAmount = articles[i].itemAmount + itempurchased[index].amount;
                        }
                        else {
                            articles[i].itemAmountUser = articles[i].itemAmountUser + itempurchased[index].amount;
                        }
                        sw = false;
                        break;
                    }
                }
                if (sw) {
                    if (itempurchased[index].user == "anonymous") {
                        articles.push({
                            id_item: itempurchased[index].id_item,
                            description: itempurchased[index].description,
                            price: itempurchased[index].price,
                            itemAmount: itempurchased[index].amount,
                            itemAmountUser: 0
                        });
                    }
                    else {
                        articles.push({
                            id_item: itempurchased[index].id_item,
                            description: itempurchased[index].description,
                            price: itempurchased[index].price,
                            itemAmount: 0,
                            itemAmountUser: itempurchased[index].amount
                        });
                    }

                }
                if (itempurchased[index].user == "anonymous") { itemPrice = itemPrice + (itempurchased[index].price * itempurchased[index].amount); }
                else {
                    itemPriceUser = itemPriceUser + (itempurchased[index].price * itempurchased[index].amount);
                }
            }
            let terminalPrice = 0;
            let terminalPriceUser = 0;
            for (let index = 0; index < usedterminal.length; index++) {
                if (usedterminal[index].user.id == "0") { terminalPrice = terminalPrice + (usedterminal[index].price); }
                else {
                    terminalPriceUser = terminalPriceUser + (usedterminal[index].price);
                }
            }
            const recharge = await Recharge.find({ numberBox: req.params.id, operator_id: user._id});
            let recharges = [];
            let userRecharge = 0;
            //console.log(recharge)
            for (let index = 0; index < recharge.length; index++) {
                userRecharge = userRecharge + recharge[index].amount;
                const user = await User.findById(recharge[index].user_id);
                recharges.push({
                    recharge: recharge[index],
                    user
                });
            }
            operators.push({
                user,
                number: box.number,
                startdate: box.startdate,
                enddate: box.enddate,
                articles,
                itemPrice,
                itemPriceUser,
                terminalPrice,
                terminalPriceUser,
                usedterminal,
                itempurchased,
                userRecharge,
                recharges
            });
        }
        return res.status(200).json(operators);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
registryCtrl.updateRegistry = async (req, res) => {

}

module.exports = registryCtrl;