const { Router } = require('express');
const router = Router();

const { createItemTerminal,deleteItemTerminal,getItemTerminal,getItemTerminals,updateItemTerminal } = require('../controllers/itemterminal.controller');

router.route('/')
    .get(getItemTerminals)

router.route('/:id')
    .post(createItemTerminal)
    .get(getItemTerminal)
    .put(updateItemTerminal)
    .delete(deleteItemTerminal)

module.exports = router;