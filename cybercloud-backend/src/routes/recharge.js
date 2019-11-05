const { Router } = require('express');
const router = Router();

const { createRecharge, deleteRecharge, getRecharge, getRecharges, updateRecharge } = require('../controllers/recharge.controller');

router.route('/')
    .get(getRecharges)
    .post(createRecharge)

router.route('/:id')
    .get(getRecharge)
    .put(updateRecharge)
    .delete(deleteRecharge)

module.exports = router;