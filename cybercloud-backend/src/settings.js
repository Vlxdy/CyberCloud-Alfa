const Settings = require('../src/models/Settings');
const Box = require('./models/Box');
function getPrice(times, rate ) {
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
function getPriceAlfa(times, rate ) {
    times=times+1;
    rate=rate+1;
}
async function getSettings() {
    try {
        const conf = await Settings.find();
        //console.log(conf)
        if (conf.length == 0) {
            const newSetting = new Settings({
                numberBox: 1,
                rate: "",
                name: "CyberCloud"
            });
            await newSetting.save();
            getSettings();
            const newBox = new Box({
                number: 1,
                startdate: Date.now()
            });
            await newBox.save();
        }
        else {
            global.setting = conf[0];
        }
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