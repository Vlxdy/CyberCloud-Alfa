const itembagCtrl = {};

const Itembag = require('../models/itembag');

itembagCtrl.getItems = async (req, res) => {
    const items = await Itembag.find();
    let cost = 0;
    for (let index = 0; index < items.length; index++) {
        cost = cost + (items[index].price) * items[index].amount;
    }
    console.log(cost)
    res.json({ items, cost })
}
itembagCtrl.createItem = async (req, res) => {
    const { id, description, price } = req.body;
    const item = await Itembag.findOne({ "id": id })
    if (item == null) {
        const newItem = new Itembag({
            description,
            price,
            id,
            amount: 1
        });
        console.log(newItem)
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
    res.send("Item saved")
    //res.json(item)
}
itembagCtrl.deleteItem = async (req, res) => {
    //await Itembag.findByIdAndDelete(req.params.id)
    const {id} = req.body;
    const item = await Itembag.findById(req.params.id)
    console.log("entra")
    if (item == null) {
        res.send("Error")
        console.log("entra3")
    }
    else {
        console.log("entra2")
        if (item.amount > 1) {
            await Itembag.findByIdAndUpdate(req.params.id,{ "amount": item.amount - 1 });
        }
        else {
            await Itembag.findByIdAndDelete(req.params.id)
        }
        res.send("Completed")
    }

}
itembagCtrl.deleteItems = async (req, res) => {
    await Itembag.deleteMany();
    res.send("Completed")
}
itembagCtrl.getItem = async (req, res) => {
}
itembagCtrl.updateItem = async (req, res) => {
}

module.exports = itembagCtrl;