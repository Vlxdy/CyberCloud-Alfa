const { Router } = require('express');
const router = Router();

const {createInterval,deleteInterval,deleteIntervals,getInterval} = require('../controllers/interval.controller');

router.route('/')
    .get(getInterval)
    .post(createInterval)
    .delete(deleteIntervals)

router.route('/:id')
    .delete(deleteInterval)

module.exports = router;