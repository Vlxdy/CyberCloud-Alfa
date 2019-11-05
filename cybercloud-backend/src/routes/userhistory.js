const { Router } = require('express');
const router = Router();

const {createUserHistory,getUserHistories,deleteUserHistory,getUserHistory,updateUserHistory} = require('../controllers/userhistory.controller');

router.route('/')
    .get(getUserHistories)
    .post(createUserHistory)

router.route('/:id')
    .get(getUserHistory)
    .put(updateUserHistory)
    .delete(deleteUserHistory)

module.exports = router;