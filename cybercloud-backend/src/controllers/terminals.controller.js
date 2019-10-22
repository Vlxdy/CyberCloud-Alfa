const terminalsCtrl = {};

const Terminal = require('../models/Terminal');
const Times = require('../models/Times');
const TerminalOne = require('../models/TerminalOne');
const Rate = require('../models/Rate');

terminalsCtrl.getTerminalsTest = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        return res.json(terminals)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
terminalsCtrl.getTerminals = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        const terminalsAll = []
        for (let index = 0; index < terminals.length; index++) {
            //console.log(terminals[index])
            const terminal = await Terminal.findById(terminals[index]._id);
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
            const rate = await Rate.findById("5d9a65b9e164fb0de0b7b358");
            if (time > 0) {
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
                //console.log(cost)
                const newTerminal = new TerminalOne({
                    id: terminal._id,
                    number: terminal.number,
                    using: terminal.using,
                    id_bill: terminal.id_bill,
                    times: time,
                    rate: rate.interval,
                    auxitime: auxitime,
                    index: i,
                    cost: cost
                });
                terminalsAll.push(newTerminal)
            }
            else {
                const newTerminal = new TerminalOne({
                    id: terminal._id,
                    number: terminal.number,
                    using: terminal.using,
                    id_bill: terminal.id_bill,
                    cost: 0,
                    index: 0,
                    rate: rate.interval,
                    auxitime: 0,
                    times: 0
                });
                terminalsAll.push(newTerminal)
            }



        }
        //console.log(terminalsAll)
        return res.json(terminalsAll)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

terminalsCtrl.createTerminal = async (req, res) => {
    try {
        const { number } = req.body;
        const newTerminal = new Terminal({
            number: number
        });
        //console.log(newTerminal)
        await newTerminal.save();
        return res.send({ status: true })
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}

terminalsCtrl.deleteTerminal = async (req, res) => {
    //await Terminal.findByIdAndDelete(req.params.id)
    try {
        const terminal = await Terminal.findById(req.params.id);
        if (!terminal.using) {
            await Terminal.updateOne(
                { _id: req.params.id }, {
                times: []
            }
            )
            return res.json({ message: "Delete" })
        }
        else {
            return res.json({ message: "Error" })
        }
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}

terminalsCtrl.getTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
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
        const newTerminal = new TerminalOne({
            number: terminal.number,
            using: terminal.using,
            id_bill: terminal.id_bill,
            times: time,
            rate: terminal.rate
        });
        return res.json(newTerminal)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}
terminalsCtrl.updateTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
        const { using, times } = terminal
        //console.log(req)
        //console.log(terminal)
        if (using) {

            times[times.length - 1].endtime = Date.now()
            const resulta = await Terminal.updateOne(
                { _id: req.params.id }, {
                using: false,
                times
            }
            )
            //console.log(resulta)
        }
        else {
            const newTimes = new Times({
                inittime: Date.now()
            })
            const resulta = await Terminal.updateOne(
                { _id: req.params.id }, {
                using: true,
                $push: {
                    times: newTimes
                }
            })
            //console.log(resulta)
        }
        const terminal2 = await Terminal.findById(req.params.id);
        res.json(terminal2)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}

module.exports = terminalsCtrl;