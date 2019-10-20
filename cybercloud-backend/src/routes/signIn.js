const { Router } = require('express');
const router = Router();

const {signIn} = require('../controllers/auth.controller');

router.route('/')
    .post(signIn)

module.exports = router;