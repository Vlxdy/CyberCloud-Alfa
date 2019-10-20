const { Router } = require('express');
const router = Router();

const {createAuth,getAuth,deleteAuth,getAuths,updateAuth,updatePermissions} = require('../controllers/auth.controller');

router.route('/')
    .get(getAuths)
    .post(createAuth)
    .put(updatePermissions)

router.route('/:id')
    .get(getAuth)
    .put(updateAuth)
    .delete(deleteAuth)

module.exports = router;