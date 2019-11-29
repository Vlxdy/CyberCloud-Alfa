const permissionsCtrl = {};

const Auth = require('../models/User');
const permissions = require('../permissions');

permissionsCtrl.getPermissions = async(req,res)=> {
    try {
        //const user = await
        //const permissions = await Permissions.find();
        return res.send(permissions);
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
permissionsCtrl.createPermission = async (req,res)=> {
}
permissionsCtrl.deletePermission = async (req,res)=> {
}
permissionsCtrl.getPermission = async(req,res)=> {
    try {
        //const user = await Auth.findById(req.params.id);
        const permissions = await Permissions.find();
        return res.send(permissions);
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
permissionsCtrl.updatePermission = async(req,res)=> {

}

module.exports = permissionsCtrl;