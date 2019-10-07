const { Router } = require('express');
const router = Router();

const {createRate,getRates,getRate,deleteRate, updateRate} = require('../controllers/rate.controller');

router.route('/')
    .get(getRates)
    .post(createRate)

router.route('/:id')
    .get(getRate)
    .put(updateRate)
    .delete(deleteRate)

module.exports = router;