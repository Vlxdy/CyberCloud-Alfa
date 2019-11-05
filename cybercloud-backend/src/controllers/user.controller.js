const userCtrl = {};

const auth = require('../models/User');

userCtrl.getUsers = async(req,res)=> {
    try {
        const auths = await auth.find();
        res.json(auths)
    } catch (error) {
        res.status(400).send(error)
    }
}
userCtrl.deleteUser = async (req,res)=> {
}
userCtrl.getUser = async(req,res)=> {
    try {
        const user = await auth.findById(req.params.id);
        return res.json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}
userCtrl.updateUser = async(req,res)=> {
}

module.exports = userCtrl;