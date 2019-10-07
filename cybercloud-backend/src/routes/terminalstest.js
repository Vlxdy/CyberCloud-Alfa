const { Router } = require('express');
const router = Router();

const {getTerminalsTest} = require('../controllers/terminals.controller');

router.route('/')
    .get(getTerminalsTest)




module.exports = router;