const imageCtrl = {};

const image = require('../models/Image');

imageCtrl.getImages = async(req,res)=> {
    const images = await image.find();
    res.json(images)
}
imageCtrl.createImage = async (req,res)=> {
    const { detail, name } = req.body;
    const newImage = new image({
        detail,
        name
    });
    try { 
        await newImage.save();
        return res.send({status:true})
    } catch (err) {
        return res.status(400).send({status:false, error: err});
    }
}
imageCtrl.deleteImage = async (req,res)=> {
}
imageCtrl.getImage = async(req,res)=> {
}
imageCtrl.updateImage = async(req,res)=> {

}

module.exports = imageCtrl;