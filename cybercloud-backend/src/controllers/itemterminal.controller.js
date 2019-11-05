const itemterminalCtrl = {};
const Terminal = require('../models/Terminal');
const BagTerminal = require('../models/BagTerminal');


itemterminalCtrl.getItemTerminals = async(req,res)=> {
    try {
        const terminals = await Terminal.find();
        return res.json(terminals)
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
itemterminalCtrl.createItemTerminal = async (req,res)=> {
    try {
        //console.log(req.params.id)
        const bagterminal = await BagTerminal.find();
        const terminal = await Terminal.findById(req.params.id);
        if(terminal.using)
        {
            
            for (let index1 = 0; index1 < bagterminal.length; index1++) {
                
                let sw = true;
                for (let index = 0; index < terminal.articles.length; index++) {
                    
                    if (terminal.articles[index].articles_id==bagterminal[index1].id) {
                        terminal.articles[index].amount= terminal.articles[index].amount+bagterminal[index1].amount;
                        sw=false;
                        break;
                    }
                }
                if(sw){
                    terminal.articles.push({
                        amount:bagterminal[index1].amount,
                        description: bagterminal[index1].description,
                        articles_id: bagterminal[index1].id,
                        price: bagterminal[index1].price
                    })
                }
            }
            
            const resulte = await Terminal.findByIdAndUpdate(req.params.id,{
                    articles: terminal.articles
            });
            //terminal.articles.push()
            return res.json({terminal,bagterminal, resulte});
        }
        else{
            return res.json({Error:"Terminal no ocupada."});
        }
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}
itemterminalCtrl.deleteItemTerminal = async (req,res)=> {
}
itemterminalCtrl.getItemTerminal = async(req,res)=> {
}
itemterminalCtrl.updateItemTerminal = async(req,res)=> {
    try {
        const terminal = await Terminal.findById(req.params.id);
        if(terminal.using)
        {
            
            await Terminal.findByIdAndUpdate(req.params.id,{
                $push: {
                    articles: req.body
                }
            });
            //terminal.articles.push()
            return res.json(terminal);
        }
        else{
            return res.json({Error:"Terminal no ocupada."});
        }
    } catch (error) {
        return res.status(400).send({status:false, error});
    }
}

module.exports = itemterminalCtrl;