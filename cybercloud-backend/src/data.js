const Terminal = require('./models/Terminal');
const Rate = require('./models/Rate');
const UsedTerminal = require('./models/UsedTerminal');
const ItemPurchased = require('./models/ItemPurchased');
const User = require('./models/User')
const Item = require('./models/Item')

getTerminal = async (id) => {
    await getTerminals();
    return global.Terminals[id - 1];
}
getTerminals = async () => {
    try {
        //console.log(global.setting.rate[1])
        //const rate = await Rate.findById(global.setting.rate);
        //if (rate != null) {
        const terminals = await Terminal.find();
        //console.log(terminals);
        const terminalsAll = []
        for (let index = 0; index < terminals.length; index++) {
            //console.log(terminals[index])
            //let terminal = await Terminal.findById(terminals[index]._id);
            let money = 0;
            let user;
            if (terminals[index].user.id != "0") {
                user = await User.findById(terminals[index].user.id);
                money = user.money;
            }
            let time = 0;
            if (terminals[index].times.length > 0) {
                for (let i = 0; i < terminals[index].times.length - 1; i++) {
                    time = time + Date.parse(terminals[index].times[i].endtime) - Date.parse(terminals[index].times[i].inittime);
                }
                if (terminals[index].times[terminals[index].times.length - 1].endtime == null) {
                    time = time + Date.now() - Date.parse(terminals[index].times[terminals[index].times.length - 1].inittime);
                }
                else {
                    time = time + Date.parse(terminals[index].times[terminals[index].times.length - 1].endtime) - Date.parse(terminals[index].times[terminals[index].times.length - 1].inittime);
                }
            }
            let costItem = 0;
            for (let i = 0; i < terminals[index].articles.length; i++) {
                costItem = costItem + (terminals[index].articles[i].price * terminals[index].articles[i].amount);
            }
            rate = global.Rates.get(terminals[index].rate);
            while (time > terminals[index].accumulated) {
                if (terminals[index].user.id != "0") {
                    if (user.money >= rate[terminals[index].rate_i].cost) {
                        await User.findByIdAndUpdate(terminals[index].user.id, {
                            money: (user.money - rate[terminals[index].rate_i].cost)
                        });
                        money = (user.money - rate[terminals[index].rate_i].cost);
                    }
                    else {
                        terminals[index].times[terminals[index].times.length - 1].endtime = Date.now()
                        const newUsedTerminal = new UsedTerminal({
                            terminals: terminals[index].times,
                            user: {
                                id: terminals[index].user.id,
                                name: terminals[index].user.name
                            },
                            price: terminals[index].price,
                            rate: terminals[index].rate,//modificacion futura
                            numberBox: global.setting.numberBox
                        });
                        await newUsedTerminal.save();
                        await Terminal.findOneAndUpdate({ number: terminals[index].number }, {
                            using: false,
                            times: [],
                            articles: [],
                            user: {
                                id: "0",
                                name: ""
                            },
                            accumulated: 0,
                            price: 0,
                            rate_i: 0,
                            rate: ""
                        });
                        terminals[index] = await Terminal.findById(terminals[index]._id);
                        break;
                    }
                }
                //console.log("llega aqui")
                terminals[index].accumulated = terminals[index].accumulated + rate[terminals[index].rate_i].time;
                terminals[index].price = terminals[index].price + rate[terminals[index].rate_i].cost;
                terminals[index].rate_i++;
                if (terminals[index].rate_i == rate.length) {
                    terminals[index].rate_i = 0;
                }
                await Terminal.findOneAndUpdate({ number: terminals[index].number }, {
                    accumulated: terminals[index].accumulated,
                    price: terminals[index].price,
                    rate_i: terminals[index].rate_i
                });
            }
            const newTerminal = {
                id: terminals[index]._id,
                number: terminals[index].number,
                using: terminals[index].using,
                times: terminals[index].times,
                time,
                accumulated: terminals[index].accumulated,
                price: terminals[index].price,
                rate_i: terminals[index].rate_i,
                rate: terminals[index].rate,
                user: {
                    id: terminals[index].user.id,
                    name: terminals[index].user.name,
                    money
                },
                articles: terminals[index].articles,
                costItem
            };
            terminalsAll.push(newTerminal)
        }
        global.Terminals = terminalsAll;

        //console.log(terminalsAll)
        //console.log(global.Terminals)
        //}
        //else {
        //    global.Terminals = [];
        //}
    } catch (error) {
        console.log(error)
        global.Terminals = [];
    }
}
getArticle =async( id )=>{
    try {
        const item = await Item.findById(id)
        return item;
    } catch (error) {
        return error;
    }
}
module.exports = { getTerminals, getTerminal, getArticle };