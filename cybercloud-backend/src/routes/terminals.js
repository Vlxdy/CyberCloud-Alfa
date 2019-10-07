const { Router } = require('express');
const router = Router();

const {getTerminals,createTerminal, getTerminal, updateTerminal, deleteTerminal, getTerminalsTest} = require('../controllers/terminals.controller');

router.route('/')
    .get(getTerminals)
    .post(createTerminal)

router.route('/:id')
    .get(getTerminal)
    .put(updateTerminal)
    .delete(deleteTerminal)
router.route('/test')
    .get(getTerminalsTest)




module.exports = router;