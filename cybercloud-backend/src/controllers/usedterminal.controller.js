const usedterminalCtrl = {};

const UsedTerminal = require('../models/UsedTerminal');
const Terminal = require('../models/Terminal');
const ItemPurchased = require('../models/ItemPurchased')

const {getTerminal} = require('../data')

usedterminalCtrl.getUsedTerminals = async (req, res) => {
    try {
        const usedterminals = await UsedTerminal.find();
        return res.json(usedterminals)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
usedterminalCtrl.createUsedTerminal = async (req, res) => {
}
usedterminalCtrl.deleteUsedTerminal = async (req, res) => {
    try {
        const terminal = await getTerminal(req.params.id);
        console.log(terminal);
        if (terminal.using && terminal.user.id != "0") {
            terminal.times[terminal.times.length - 1].endtime = Date.now()
            const newUsedTerminal = new UsedTerminal({
                terminals: terminal.times,
                user: {
                    id: terminal.user.id,
                    name: terminal.user.name
                },
                price: terminal.price,
                rate: terminal.rate,
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
                { number: req.params.id }, {
                using:false,
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
            if (terminal.using) {
                terminal.times[terminal.times.length - 1].endtime = Date.now()
                await Terminal.findOneAndUpdate(
                    { number: req.params.id }, {
                    using: false,
                    times: terminal.times
                });
                return res.json({ status: true, message: "Correctly Updated " })
            }
            else {
                return res.json({ status: false, message: "Error" })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
usedterminalCtrl.getUsedTerminal = async (req, res) => {
}
usedterminalCtrl.updateUsedTerminal = async (req, res) => {

}

module.exports = usedterminalCtrl;