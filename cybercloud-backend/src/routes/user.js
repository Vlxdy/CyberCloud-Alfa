const { Router } = require('express');
const router = Router();

const {deleteUser,getUser,updateUser,getUsers} = require('../controllers/user.controller');

router.route('/')
    .get(getUsers)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;