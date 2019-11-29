const operatorCtrl = {};

const User = require('../models/User');
const permissions = require('../permissions');

operatorCtrl.getOperators = async (req, res) => {
    try {
        const auths = await User.find({operator: true});
        //{permissions:{$gt:0}});
        return res.send(auths);
    } catch (error) {
        console.log(error)
        return res.status(400).send({status:false, error});
    }
}
operatorCtrl.createOperator = async (req, res) => {
    try {
        const auth = await User.findById(req.params.id);
        await User.findByIdAndUpdate(req.params.id,{
            operator: !auth.operator,
            permissions: [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        });
        return res.json({});
    } catch (error) {
        console.log(error)
        return res.status(400).send({status:false, error});
    }
}
operatorCtrl.deleteOperator = async (req, res) => {
    try {
        return res.json({});
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
operatorCtrl.deleteOperators = async (req, res) => {
    try {
        return res.json({});
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
operatorCtrl.getOperator = async (req, res) => {
    try {
        const auth = await User.findById(req.params.id);
        const permission = []
        for (let index = 0; index < permissions.length; index++) {
            permission.push({
                description:permissions[index].description,
                number:permissions[index].number,
                value: auth.permissions[index]
            });
        }
        return res.json({
            permission,
            auth
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({status:false, error});
    }
}
operatorCtrl.updateOperator = async (req, res) => {
    try {
        const auth = await User.findById(req.params.id);
        auth.permissions[req.body.number-1]=!auth.permissions[req.body.number-1];
        await User.findByIdAndUpdate(req.params.id,{
            permissions: auth.permissions
        });
        return res.json({});
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
module.exports = operatorCtrl;