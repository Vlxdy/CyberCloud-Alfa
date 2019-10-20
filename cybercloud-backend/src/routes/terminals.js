const { Router } = require('express');
const router = Router();
const rutasProtegidas = require('../configs/token')

const {getTerminals,createTerminal, getTerminal, updateTerminal, deleteTerminal, getTerminalsTest} = require('../controllers/terminals.controller');

router.route('/')
    .get(getTerminals)
    .post(createTerminal)

router.route('/:id')
    .get(getTerminal)
    .put(rutasProtegidas, updateTerminal)
    .delete(rutasProtegidas, deleteTerminal)
router.route('/test')
    .get(getTerminalsTest)




module.exports = router;