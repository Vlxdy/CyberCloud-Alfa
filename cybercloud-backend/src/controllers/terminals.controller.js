const terminalsCtrl = {};

const Terminal = require('../models/Terminal');
const Rate = require('../models/Rate');
const UsedTerminal = require('../models/UsedTerminal');
const { getPrice } = require('../settings');
const ItemPurchased = require('../models/ItemPurchased');
const User = require('../models/User')

terminalsCtrl.getTerminals = async (req, res) => {
    try {
        const rate = await Rate.findById(global.setting.rate);
        if (rate != null) {
            const terminals = await Terminal.find();
            //console.log(terminals);
            
            const terminalsAll = []
            for (let index = 0; index < terminals.length; index++) {
                //console.log(terminals[index])
                
                let terminal = await Terminal.findById(terminals[index]._id);
                let time = 0;
                if (terminal.times.length > 0) {
                    for (let i = 0; i < terminal.times.length - 1; i++) {
                        time = time + Date.parse(terminal.times[i].endtime) - Date.parse(terminal.times[i].inittime);
                    }
                    if (terminal.times[terminal.times.length - 1].endtime == null) {
                        time = time + Date.now() - Date.parse(terminal.times[terminal.times.length - 1].inittime);
                    }
                    else {
                        time = time + Date.parse(terminal.times[terminal.times.length - 1].endtime) - Date.parse(terminal.times[terminal.times.length - 1].inittime);
                    }
                }
                let costItem = 0;
                for (let i = 0; i < terminal.articles.length; i++) {
                    costItem = costItem + (terminal.articles[i].price * terminal.articles[i].amount);
                }
                while (time > terminal.accumulated) {

                    if (terminal.user.id != "0") {
                        const user = await User.findByIdAndUpdate(terminal.user.id);
                        if (user.money >= rate.interval[terminal.rate_i].cost) {
                            await User.findByIdAndUpdate(terminal.user.id, {
                                money: (user.money - rate.interval[terminal.rate_i].cost)
                            });
                        }
                        else {
                            terminal.times[terminal.times.length - 1].endtime = Date.now()
                            const newUsedTerminal = new UsedTerminal({
                                terminals: terminal.times,
                                user: {
                                    id: terminal.user.id,
                                    name: terminal.user.name
                                },
                                price: terminal.price,
                                rate: global.setting.rate,
                                numberBox: global.setting.numberBox
                            });
                            await newUsedTerminal.save();

                            await Terminal.findOneAndUpdate({ number: terminal.number }, {
                                using: false,
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
                            terminal = await Terminal.findById(terminals[index]._id);
                            break;
                        }
                    }
                    //console.log("llega aqui")
                    
                        terminal.accumulated = terminal.accumulated + rate.interval[terminal.rate_i].time;
                        terminal.price = terminal.price + rate.interval[terminal.rate_i].cost;
                        terminal.rate_i++;
                        if (terminal.rate_i == rate.interval.length) {
                            terminal.rate_i = 0;
                        }
                        await Terminal.findOneAndUpdate({ number: terminal.number }, {
                            accumulated: terminal.accumulated,
                            price: terminal.price,
                            rate_i: terminal.rate_i
                        });
                    

                }
                const newTerminal = {
                    id: terminal._id,
                    number: terminal.number,
                    using: terminal.using,
                    times: time,
                    rate: rate.interval,
                    auxitime: terminal.accumulated,
                    index: terminal.rate_i,
                    cost: terminal.price,
                    user: terminal.user,
                    articles: terminal.articles,
                    costItem
                };
                terminalsAll.push(newTerminal)

            }
            return res.json(terminalsAll)
        }
        else {
            return res.json({ error: "interval" });
        }
    } catch (error) {
        console.log(error)
        return res.json({ status: false, error });
    }
}
terminalsCtrl.createTerminal = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        const newTerminal = new Terminal({
            number: terminals.length + 1
        });
        //console.log(newTerminal)
        await newTerminal.save();
        return res.send({ status: true })
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
terminalsCtrl.deleteTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
        const rate = await Rate.findById(global.setting.rate);
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
                price: getPrice(terminal.times, rate),
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
            await Terminal.findByIdAndUpdate(
                req.params.id, {
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
            return res.json({ message: "Delete" })
        }
        else {
            return res.json({ message: "Error" })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });

    }
}
terminalsCtrl.getTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findOne({ number: req.params.id });
        const rate = await Rate.findById(global.setting.rate);
        //console.log(terminal)
        let time = 0;
        if (terminal.times.length > 0) {
            for (let i = 0; i < terminal.times.length - 1; i++) {
                time = time + Date.parse(terminal.times[i].endtime) - Date.parse(terminal.times[i].inittime);
            }
            if (terminal.times[terminal.times.length - 1].endtime == null) {
                time = time + Date.now() - Date.parse(terminal.times[terminal.times.length - 1].inittime);
            }
            else {
                time = time + Date.parse(terminal.times[terminal.times.length - 1].inittime)
                    - Date.parse(terminal.times[terminal.times.length - 1].endtime);
            }
        }
        let costItem = 0;
        for (let i = 0; i < terminal.articles.length; i++) {
            costItem = costItem + (terminal.articles[i].price * terminal.articles[i].amount);
        }/*
        while (time > terminal.accumulated) {
            if (terminal.user.id != "0") {
                const user = await User.findByIdAndUpdate(terminal.user.id);
                if (user.money >= rate.interval[terminal.rate_i].cost) {
                    await User.findByIdAndUpdate(terminal.user.id, {
                        money: (user.money - rate.interval[terminal.rate_i].cost)
                    });
                }
                else {
                    const newUsedTerminal = new UsedTerminal({
                        terminals: terminal.times,
                        user: {
                            id: terminal.user.id,
                            name: terminal.user.name
                        },
                        price: terminal.price,
                        rate: global.setting.rate,
                        numberBox: global.setting.numberBox
                    });
                    await newUsedTerminal.save();
                    await Terminal.findOneAndUpdate({ number: req.params.id }, {
                        using: false,
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
                    const newTerminal = {
                        number: terminal.number,
                        using: false,
                        times: 0,
                        costTerminal: 0,
                        rate,
                        costItem: 0,
                        items: []
                    };
                    return res.json(newTerminal)
                }
            }
            terminal.accumulated = terminal.accumulated + rate.interval[terminal.rate_i].time;
            terminal.price = terminal.price + rate.interval[terminal.rate_i].cost;
            terminal.rate_i++;
            if (terminal.rate_i == rate.interval.length) {
                terminal.rate_i = 0;
            }
            await Terminal.findOneAndUpdate({ number: req.params.id }, {
                accumulated: terminal.accumulated,
                price: terminal.price,
                rate_i: terminal.rate_i
            });
        }*/
        const newTerminal = {
            number: terminal.number,
            user: terminal.user,
            using: terminal.using,
            times: time,
            costTerminal: terminal.price,
            rate,
            costItem,
            items: terminal.articles
        };
        return res.json(newTerminal)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
terminalsCtrl.updateTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
        const { using, times } = terminal
        if (using) {

            times[times.length - 1].endtime = Date.now()
            await Terminal.findByIdAndUpdate(
                req.params.id, {
                using: false,
                times
            });
        }
        else {
            await Terminal.findByIdAndUpdate(
                req.params.id, {
                using: true,
                $push: {
                    times: {
                        number: terminal.number,
                        inittime: Date.now()
                    }
                }
            });
        }
        const terminal2 = await Terminal.findById(req.params.id);
        res.json(terminal2)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }

}
module.exports = terminalsCtrl;