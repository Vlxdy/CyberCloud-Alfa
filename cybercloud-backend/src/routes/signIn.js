const { Router } = require('express');
const router = Router();

const {signIn,signInTerminal} = require('../controllers/auth.controller');

router.route('/')
    .post(signIn)
    .put(signInTerminal)

module.exports = router;