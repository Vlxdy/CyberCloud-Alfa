const itemuserCtrl = {};

const auth = require('../models/User');

itemuserCtrl.getItems = async (req, res) => {
    try {
        const itemusers = await auth.find();
        cost = 0;/*
    for (let index = 0; index < items.length; index++) {
        cost = cost + (itemusers[index].price) * itemusers[index].amount;
    }*/
        return res.json(itemusers)
    } catch (error) {
        return res.status(400).send({status:false, error: err});
    }
}
itemuserCtrl.createItem = async (req, res) => {
    try {
        const { items } = req.body;
        const useritem = await auth.findById({ user: req.params.id })
        console.log(useritem)
        if (useritem == null) {
            /*const newItemuser = new Itemuser({
                user,
                items
            })
            await newItemuser.save();*/
        }
        else {
            //await Itembag.updateOne({ "_id": item._id }, { "amount": item.amount + 1 });
        }
        /*
        const newItem = new Itembag({
            description,
            price,
            id
        });
        console.log(newItem)
        await newItem.save();
        -------*/
        return res.send({status:true})
        //res.json(item)
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error: err });
    }

}
itemuserCtrl.deleteItem = async (req, res) => {
    try {
        const { article } = req.body;
        const useritem = await auth.findById(req.params.id )
        for (let index = 0; index < useritem.items.length; index++) {
            if (article==useritem.items[index].article) {
                if(useritem.items[index].amount>1)
                {
                    useritem.items[index].amount=useritem.items[index].amount-1;
                    const result = await auth.findByIdAndUpdate(req.params.id, { items: useritem.items});
                    return res.send({status:true, result})
                }
                else{
                    let aux = [];
                    for (let index = 0; index < useritem.items.length; index++) {
                        if (useritem.items[index].article!=article) {
                            aux.push(useritem.items[index]);
                        }
                    }
                    const result = await auth.findByIdAndUpdate(req.params.id, { "items": aux});
                    return res.send({status:true,result})
                }
            }
        }
        return res.status(500).send({status:false})
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
itemuserCtrl.deleteItems = async (req, res) => {
    try {
        //console.log(req)
        await auth.findByIdAndUpdate(req.body.id, { "items": []});
        return res.status(200).send({status:true})
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
itemuserCtrl.getItem = async (req, res) => {
    try {
        user = await auth.findById(req.params.id);
        let cost = 0;
        for (let index = 0; index < user.items.length; index++) {
            cost = cost + (user.items[index].amount*user.items[index].price);
            //console.log("entrada")
        }
        //console.log(cost)
        return res.status(200).json({_id:user._id,items:user.items, money: user.money,cost});
    } catch (error) {
        return res.status(400).send(error);
    }
}
itemuserCtrl.updateItem = async (req, res) => {
    try {
        const { article, description, price } = req.body;
        const useritem = await auth.findById(req.params.id )
        //console.log(useritem)
        //const item = await auth.find({tags:{$all:["laborum","sunt"]}},{name:1,tags:1})
        for (let index = 0; index < useritem.items.length; index++) {
            if (article==useritem.items[index].article) {
                //console.log(useritem.items[index])
                useritem.items[index].amount=useritem.items[index].amount+1;
                await auth.findByIdAndUpdate(req.params.id, { "items": useritem.items});
                return res.send({status:true})
            }
        }
        await auth.findByIdAndUpdate(req.params.id, {$push:{ "items": {article,description,price, amount: 1} }});
        return res.send({status:true})
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: false, error: err });
    }
}

module.exports = itemuserCtrl;