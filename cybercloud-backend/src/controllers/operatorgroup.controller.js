const operatorgroupCtrl = {};

const Auth = require('../models/User');
const OperatorGroup = require('../models/OperatorGroup');

operatorgroupCtrl.getOperatorGroups = async (req, res) => {
    try {
        const operatorgroups = await OperatorGroup.find();//{operator: true});
        //{permissions:{$gt:0}});
        return res.send(operatorgroups);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
operatorgroupCtrl.createOperatorGroup = async (req, res) => {
    try {
        const newoperatorgroups = new OperatorGroup({
            name: req.body.name
        });
        const saved = await newoperatorgroups.save();
        //const peratorgroups = await OperatorGroup.find();//{operator: true});
        //{permissions:{$gt:0}});
        return res.send(saved);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
operatorgroupCtrl.deleteOperatorGroup = async (req, res) => {
    try {
        const saved = await OperatorGroup.deleteOne({ _id: req.params.id });
        //const peratorgroups = await OperatorGroup.find();//{operator: true});
        //{permissions:{$gt:0}});
        return res.send(saved);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
function verification(array, id) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === id.toString()) {
            return true;
        }
    }
    return false;
}
operatorgroupCtrl.getOperatorGroup = async (req, res) => {
    try {
        const group = await OperatorGroup.findById(req.params.id);
        if (group) {
            const operators = await Auth.find({ operator: true });
            let operatorG = [];
            let operatorS = [];
            for (let index = 0; index < operators.length; index++) {
                if (verification(group.operator, operators[index]._id)) {
                    operatorG.push({
                        _id: operators[index]._id,
                        name: operators[index].name,
                        phone: operators[index].phone,
                        email: operators[index].email
                    });
                }
                else {
                    operatorS.push({
                        _id: operators[index]._id,
                        name: operators[index].name,
                        phone: operators[index].phone,
                        email: operators[index].email
                    });
                }
                //const element = operators[index];
            }
            //{permissions:{$gt:0}});
            return res.send({ operatorG, operatorS, group });
        }
        else {
            return res.status(400).send({ status: false });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
operatorgroupCtrl.updateOperatorGroup = async (req, res) => {
    try {
        const saved = await OperatorGroup.updateOne({ _id: req.params.id }, {
            $push: { operator: req.body.operator }
        });
        return res.send(saved);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
operatorgroupCtrl.patchOperatorGroup = async (req, res) => {
    try {
        const operatorgroups = await OperatorGroup.findById(req.params.id);
        const { operator } = operatorgroups
        /*const saved = await OperatorGroup.updateOne({_id:req.params.id},{
            $push:{operator:req.body.operator}
        });*/
        //const peratorgroups = await OperatorGroup.find();//{operator: true});
        //{permissions:{$gt:0}});
        let aux = [];
        for (let index = 0; index < operator.length; index++) {
            if (req.body.operator != operator[index]) {
                aux.push(operator[index])
            }
        }
        const saved = await OperatorGroup.updateOne({ _id: req.params.id }, {
            operator: aux
        });
        return res.send(saved);
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error });
    }
}
module.exports = operatorgroupCtrl;