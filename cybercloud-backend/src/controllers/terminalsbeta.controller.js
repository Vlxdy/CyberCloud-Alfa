const terminalsbetaCtrl = {};

const Terminal = require('../models/Terminal');
const UsedTerminal = require('../models/UsedTerminal');
const ItemPurchased = require('../models/ItemPurchased');
const { getTerminal, getTerminals } = require('../data');

terminalsbetaCtrl.getTerminals = async (req, res) => {
    try {
        //console.log(global.Terminals)
        return res.json(global.Terminals)
    } catch (error) {
        console.log(error)
        return res.json({ status: false, error });
    }
}
terminalsbetaCtrl.deleteTerminal = async (req, res) => {
    if (global.setting.boxStatus) {
        try {
            await getTerminals();
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
    else{
        return res.send({
            error: "Box is Closed."
        });
    }
}
terminalsbetaCtrl.getTerminal = async (req, res) => {
    try {
        return res.json(global.Terminals[req.params.id - 1])
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}

terminalsbetaCtrl.changeTerminal = async (req, res) => {
    try {
        const terminal1 = await Terminal.findById(req.params.id);
        const terminal2 = await Terminal.findOne({number: req.body.terminal});
        const resp1 = await Terminal.findByIdAndUpdate(terminal1._id,{
            user:terminal2.user,
            using: terminal2.using,
            accumulated: terminal2.accumulated,
            price: terminal2.price,
            rate: terminal2.rate,
            rate_i: terminal2.rate_i,
            times: terminal2.times,
            articles: terminal2.articles,
            items: terminal2.items
        });
        const resp2 = await Terminal.findByIdAndUpdate(terminal2._id,{
            user:terminal1.user,
            using: terminal1.using,
            accumulated: terminal1.accumulated,
            price: terminal1.price,
            rate: terminal1.rate,
            rate_i: terminal1.rate_i,
            times: terminal1.times,
            articles: terminal1.articles,
            items: terminal1.items
        });
        return res.json({resp1,resp2});
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }

}
terminalsbetaCtrl.updateTerminal = async (req, res) => {
    console.log(global.setting.boxStatus)
    if (global.setting.boxStatus) {
        try {
            await getTerminals();
            const terminal = await getTerminal(req.params.id);
            const { using, times } = terminal
            if (using) {
                times[times.length - 1].endtime = Date.now()
                await Terminal.findOneAndUpdate(
                    { number: req.params.id }, {
                    using: false,
                    times
                });
            }
            else {
                if (times.length==0) {
                    await Terminal.findOneAndUpdate(
                        { number: req.params.id }, {
                        rate: global.setting.rate[0],       
                        using: true,
                        $push: {
                            times: {
                                number: terminal.number,
                                inittime: Date.now()
                            }
                        }
                    });
                }
                else{
                    await Terminal.findOneAndUpdate(
                        { number: req.params.id }, {
                        using: true,
                        $push: {
                            times: {
                                number: terminal.number,
                                inittime: Date.now()
                            }
                        }
                    });
                }
            }
            return res.json({ status: true, message: "Correctly Updated " })
        } catch (error) {
            console.log(error)
            return res.status(400).send({ status: false, error });
        }
    }
    else{
        return res.send({
            error: "Box is Closed."
        });
    }
}
module.exports = terminalsbetaCtrl;