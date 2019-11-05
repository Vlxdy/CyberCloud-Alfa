const { Router } = require('express');
const router = Router();

const {getConfiguration, updateConfiguration,addTerminalConfiguration, deleteTerminalConfiguration} = require('../controllers/configuration.controller');

router.route('/')
    .get(getConfiguration)
    .put(updateConfiguration)
    .post(addTerminalConfiguration)
    .delete(deleteTerminalConfiguration)
module.exports = router;