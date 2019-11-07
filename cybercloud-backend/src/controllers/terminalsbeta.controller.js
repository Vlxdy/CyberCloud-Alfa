const terminalsbetaCtrl = {};

const Terminal = require('../models/Terminal');
const UsedTerminal = require('../models/UsedTerminal');
const ItemPurchased = require('../models/ItemPurchased');
const { getTerminal } = require('../data');

terminalsbetaCtrl.getTerminals = async (req, res) => {
    try {
            return res.json(global.Terminals)
    } catch (error) {
        console.log(error)
        return res.json({ status: false, error });
    }
}
terminalsbetaCtrl.deleteTerminal = async (req, res) => {
    try {
        const terminal = await getTerminal(req.params.id);

        if (!terminal.using) {
            const newUsedTerminal = new UsedTerminal({
                terminals: terminal.times,
                user: {
                    id: terminal.user.id,
                    name: terminal.user.name
                },
                operator: {
                    id: req.body.operator._id,
                    name: req.body.operator.name
                },
                price: terminal.price,
                rate: global.setting.rate,
                numberBox: global.setting.numberBox
            });
            await newUsedTerminal.save();
            for (let index = 0; index < terminal.articles.length; index++) {
                const newItemPurchased = new ItemPurchased({
                    id_item: terminal.articles[index].articles_id,
                    description: terminal.articles[index].description,
                    price: terminal.articles[index].price,
                    amount: terminal.articles[index].amount,
                    numberBox: global.setting.numberBox,
                    operator: req.body.operator._id,
                    operatorname: req.body.operator.name
                });
                await newItemPurchased.save();
            }
            await Terminal.findOneAndUpdate(
                {number:req.params.id}, {
                times: [],
                articles: [],
                user: {
                    id: "0",
                    name: ""
                },
                accumulated: 0,
                price: 0,
                rate_i: 0
            });
            return res.json({ status: true, message: "Correctly Removed" })
        }
        else {
            return res.json({ status: false, message: "Error" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
terminalsbetaCtrl.getTerminal = async (req, res) => {
    try {        
        return res.json(global.Terminals[req.params.id-1])
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
terminalsbetaCtrl.updateTerminal = async (req, res) => {
    try {
        const terminal = await getTerminal(req.params.id);
        const { using, times } = terminal
        if (using) {
            times[times.length - 1].endtime = Date.now()
            await Terminal.findOneAndUpdate(
                {number:req.params.id}, {
                using: false,
                times
            });
        }
        else {
            await Terminal.findOneAndUpdate(
                {number:req.params.id}, {
                using: true,
                $push: {
                    times: {
                        number: terminal.number,
                        inittime: Date.now()
                    }
                }
            });
        }
        return res.json({status: true, message: "Correctly Updated "})
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }

}
module.exports = terminalsbetaCtrl;