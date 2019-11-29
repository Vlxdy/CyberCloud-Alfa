const { Router } = require('express');
const router = Router();

const { deleteTerminal, getTerminal, getTerminals, updateTerminal,changeTerminal} = require('../controllers/terminalsbeta.controller');

    router.route('/')
    .get(getTerminals)

router.route('/:id')
    .get(getTerminal)
    .put(updateTerminal)
    .delete(deleteTerminal)
    .patch(changeTerminal)

module.exports = router;