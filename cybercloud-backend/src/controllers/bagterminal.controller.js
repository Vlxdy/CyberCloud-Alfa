const bagterminalCtrl = {};

const BagTerminal = require('../models/BagTerminal');

bagterminalCtrl.getItems = async (req, res) => {
    try {
        const items = await BagTerminal.find();
        let cost = 0;
    for (let index = 0; index < items.length; index++) {
        cost = cost + (items[index].price) * items[index].amount;
    }
        return res.json({ items, cost })
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
    
}
bagterminalCtrl.createItem = async (req, res) => {
    try {
        const { id, description, price, image } = req.body;
        const item = await BagTerminal.findOne({ "id": id })
        if (item == null) {
            const newItem = new BagTerminal({
                description,
                price,
                id,
                image,
                amount: 1
            });
            await newItem.save();
        }
        else {
            await BagTerminal.updateOne({ "_id": item._id }, { "amount": item.amount + 1 });
        }
        /*
        const newItem = new BagTerminal({
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
        return res.status(400).send({ status: false, error });
    }

}
bagterminalCtrl.deleteItem = async (req, res) => {
    //await BagTerminal.findByIdAndDelete(req.params.id)
    try {
        const item = await BagTerminal.findById(req.params.id)
        if (item == null) {
            res.send("Error")
        }
        else {
            if (item.amount > 1) {
                await BagTerminal.findByIdAndUpdate(req.params.id, { "amount": item.amount - 1 });
            }
            else {
                await BagTerminal.findByIdAndDelete(req.params.id)
            }
            return res.send({status:true})
        }
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }


}
bagterminalCtrl.deleteItems = async (req, res) => {
    try {
        await BagTerminal.deleteMany();
        return res.send({status:true})    
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
    
}
bagterminalCtrl.getItem = async (req, res) => {
}
bagterminalCtrl.updateItem = async (req, res) => {
}

module.exports = bagterminalCtrl;