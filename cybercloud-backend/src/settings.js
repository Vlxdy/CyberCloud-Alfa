const Settings = require('../src/models/Settings');
const Box = require('./models/Box');
const Rate = require('./models/Rate');
const Terminal = require('./models/Terminal');
const OperatorGroup = require('./models/OperatorGroup');

//const permissions = require('./permissions');

function getPrice(times, rate) {
    let time = 0;
    if (times.length > 0) {
        for (let i = 0; i < times.length; i++) {
            time = time + Date.parse(times[i].endtime) - Date.parse(times[i].inittime);
        }
    }
    let auxitime = 0;
    let cost = 0;
    let i = 0;
    //console.log(rate.interval[i].time)
    while (time > auxitime) {
        //console.log(auxitime)
        auxitime = auxitime + rate.interval[i].time;
        cost = cost + rate.interval[i].cost;
        i++;
        if (i == rate.interval.length) {
            i = 0;
        }
    }
    return cost;
}
function getPriceAlfa(times, rate) {
    times = times + 1;
    rate = rate + 1;
}
async function getSettings() {
    try {
        const conf = await Settings.find();
        //console.log(permissions)
        if (conf.length == 0) {
            const newRate = new Rate({
                name: "Tarifa por defecto.",
                interval: [
                    {
                        time: 60000,
                        cost: 1
                    }
                ]
            });
            await newRate.save();
            const newSetting = new Settings({
                numberBox: 1,
                rate: [newRate._id,newRate._id],
                name: "CyberCloud"
            });
            await newSetting.save();
            const newoperatorgroups = new OperatorGroup({
                name: "Grupo-CyberCloud"
            });
            await newoperatorgroups.save();
            let fecha = new Date();
            fecha.setDate(fecha.getDate() + 2);
            const newBox = new Box({
                number: 1,
                group: newoperatorgroups._id,
                calendar:{
                    init:new Date(),
                    end: fecha
                }
            });
            await newBox.save();
            const newTerminal = new Terminal({
                number: 1
            });
            await newTerminal.save();
            getSettings();
        }
        else {
            const rates = await Rate.find();
            //console.log(rates)
            global.Rates = new Map();
            //let map = new Map();
            for (let index = 0; index < rates.length; index++) {
                //const vars = new String(rates[index]._id);
                //global.Rates.set(vars.substring(0,vars.length), rates[index].interval);
                global.Rates.set(rates[index]._id.toString(), rates[index].interval);
            }
            //console.log(global.Rates.keys())
            //console.log(global.Rates.get('5dc56091aa2c8f1bc452ebe9'));
            global.setting = conf[0];
            const box = await Box.findOne({number:global.setting.numberBox})
            const group = await OperatorGroup.findById(box.group);

            global.operators = new Set(group.operator);
            /*for (let index = 0; index < group.operator.length; index++) {
                global.operators.add(group.operator[index].toString());
            }*/
            //console.log(global.operators.has(group.operator[0]))
            /*for (let user of global.operators) {
                console.log({user}); // John (then Pete and Mary)
            }*/
        }
        //console.log(global.Rates.get(global.setting.rate[0]));
    } catch (error) {
        console.log(error);
    }
};
async function setSettings() {
    try {
        const conf = await Settings.find();
        global.conf;
        console.log(conf);
    } catch (error) {
        console.log(error);
    }
};
module.exports = { getSettings, setSettings, getPrice, getPriceAlfa };