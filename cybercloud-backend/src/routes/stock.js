const { Router } = require('express');
const router = Router();

const {createStock,deleteStock,getStock,getStocks,patchStock,updateStock} = require('../controllers/stock.controller');

router.route('/')
    .get(getStocks)
    .post(createStock)

router.route('/:id')
    .get(getStock)
    .put(updateStock)
    .delete(deleteStock)
    .patch(patchStock)



module.exports = router;