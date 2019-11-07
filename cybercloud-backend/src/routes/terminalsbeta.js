const { Router } = require('express');
const router = Router();

const { deleteTerminal, getTerminal, getTerminals, updateTerminal } = require('../controllers/terminalsbeta.controller');

    router.route('/')
    .get(getTerminals)

router.route('/:id')
    .get(getTerminal)
    .put(updateTerminal)
    .delete(deleteTerminal)

module.exports = router;