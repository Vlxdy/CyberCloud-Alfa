const itembagCtrl = {};

const Itembag = require('../models/itembag');

itembagCtrl.getItems = async (req, res) => {
    try {
        const items = await Itembag.find();
        let cost = 0;
    for (let index = 0; index < items.length; index++) {
        cost = cost + (items[index].price) * items[index].amount;
    }
        return res.json({ items, cost })
    } catch (error) {
        return res.status(400).send({status:false, error: err});
    }
    
}
itembagCtrl.createItem = async (req, res) => {
    try {
        const { id, description, price, image } = req.body;
        const item = await Itembag.findOne({ "id": id })
        if (item == null) {
            const newItem = new Itembag({
                description,
                price,
                id,
                image,
                amount: 1
            });
            await newItem.save();
        }
        else {
            await Itembag.updateOne({ "_id": item._id }, { "amount": item.amount + 1 });
        }
        /*
        const newItem = new Itembag({
            description,
            price,
            id
        });
        console.log(newItem)
        await newItem.save();
        */
        return res.send({status:true})
        //res.json(item)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}
itembagCtrl.deleteItem = async (req, res) => {
    //await Itembag.findByIdAndDelete(req.params.id)
    try {
        const item = await Itembag.findById(req.params.id)
        if (item == null) {
            res.send("Error")
        }
        else {
            if (item.amount > 1) {
                await Itembag.findByIdAndUpdate(req.params.id, { "amount": item.amount - 1 });
            }
            else {
                await Itembag.findByIdAndDelete(req.params.id)
            }
            return res.send({status:true})
        }
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }


}
itembagCtrl.deleteItems = async (req, res) => {
    try {
        await Itembag.deleteMany();
        return res.send({status:true})    
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
    
}
itembagCtrl.getItem = async (req, res) => {
}
itembagCtrl.updateItem = async (req, res) => {
}

module.exports = itembagCtrl;