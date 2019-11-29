const itemterminalCtrl = {};
const Terminal = require('../models/Terminal');
const BagTerminal = require('../models/BagTerminal');
const Item = require('../models/Item');
const ItemPurchased = require('../models/ItemPurchased');

itemterminalCtrl.getItemTerminals = async (req, res) => {
    try {
        const terminals = await Terminal.find();
        return res.json(terminals)
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}
verification = async (items) => {
    try {
        for (let index = 0; index < items.length; index++) {
            const item = await Item.findById(items[index].id);
            if (item.amount < items[index].amount && (!item.available)) {
                return false;
            }
        }
        return true
    } catch (error) {
        return false;
    }
}
decrement = async (items) => {
    const itemsB = []
    try {
        for (let index = 0; index < items.length; index++) {
            const item = await Item.findById(items[index].id);
            if (item.amount >= items[index].amount) {
                const respon = await Item.updateOne({ _id: items[index].id }, {
                    amount: item.amount - items[index].amount
                });
                if (respon) {
                    itemsB.push(items[index]);
                }
                else {
                    console.log("Error")
                }
            }
        }
        return itemsB
    } catch (error) {
        return itemsB;
    }
}
itemterminalCtrl.createItemTerminal = async (req, res) => {
    if (global.setting.boxStatus) {
        try {
            if (req.params.id === "0") {
                const bagterminal = await BagTerminal.find();
                const verf = await verification(bagterminal);
                if(verf){
                    await decrement(bagterminal);
                    for (let index = 0; index < bagterminal.length; index++) {
                        const newItemPurchased = new ItemPurchased({
                            id_item: bagterminal[index].id,
                            description: bagterminal[index].description,
                            price: bagterminal[index].price,
                            amount: bagterminal[index].amount,
                            numberBox: global.setting.numberBox,
                            operator: req.body.operator._id,
                            operatorname: req.body.operator.name
                        });
                        await newItemPurchased.save();
                    }
                    return res.json({ status:true });
                }
                else{
                    return res.json({ status:false });
                }
            }
            else {
                { console.log("cunas") }
                const bagterminal = await BagTerminal.find();
                const terminal = await Terminal.findById(req.params.id);
                const verf = await verification(bagterminal);
                if (terminal.using && verf) {
                    await decrement(bagterminal);
                    for (let index1 = 0; index1 < bagterminal.length; index1++) {
                        let sw = true;
                        for (let index = 0; index < terminal.articles.length; index++) {
                            if (terminal.articles[index].articles_id == bagterminal[index1].id) {
                                terminal.articles[index].amount = terminal.articles[index].amount + bagterminal[index1].amount;
                                sw = false;
                                break;
                            }
                        }
                        if (sw) {
                            terminal.articles.push({
                                amount: bagterminal[index1].amount,
                                description: bagterminal[index1].description,
                                articles_id: bagterminal[index1].id,
                                price: bagterminal[index1].price
                            })
                        }
                    }
                    //console.log(terminal.articles);
                    const resulte = await Terminal.findByIdAndUpdate(req.params.id, {
                        articles: terminal.articles
                    });
                    //terminal.articles.push()
                    return res.json({ terminal, bagterminal, resulte });
                }
                else {
                    return res.json({ Error: "Terminal no ocupada." });
                }
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({ status: false, error });
        }
    }
    else {
        return res.send({
            error: "Box is Closed."
        });
    }
}
itemterminalCtrl.deleteItemTerminal = async (req, res) => {
}
itemterminalCtrl.getItemTerminal = async (req, res) => {
}
itemterminalCtrl.updateItemTerminal = async (req, res) => {
    try {
        const terminal = await Terminal.findById(req.params.id);
        if (terminal.using) {

            await Terminal.findByIdAndUpdate(req.params.id, {
                $push: {
                    articles: req.body
                }
            });
            //terminal.articles.push()
            return res.json(terminal);
        }
        else {
            return res.json({ Error: "Terminal no ocupada." });
        }
    } catch (error) {
        return res.status(400).send({ status: false, error });
    }
}

module.exports = itemterminalCtrl;