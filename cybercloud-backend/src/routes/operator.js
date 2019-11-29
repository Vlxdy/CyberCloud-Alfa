const { Router } = require('express');
const router = Router();

const { createOperator, deleteOperator, deleteOperators, getOperator, getOperators, updateOperator } = require('../controllers/operator.controller');

router.route('/')
    .get(getOperators)
    .delete(deleteOperators)
router.route('/:id')
    .get(getOperator)
    .post(createOperator)
    .put(updateOperator)
    .delete(deleteOperator)
module.exports = router;