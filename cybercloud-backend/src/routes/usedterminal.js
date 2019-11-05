const { Router } = require('express');
const router = Router();

const { createUsedTerminal, deleteUsedTerminal,getUsedTerminal,getUsedTerminals,updateUsedTerminal } = require('../controllers/usedterminal.controller');

router.route('/')
    .get(getUsedTerminals)
    .post(createUsedTerminal)

router.route('/:id')
    .get(getUsedTerminal)
    .put(updateUsedTerminal)
    .delete(deleteUsedTerminal)


module.exports = router;