const { Router } = require('express');
const router = Router();
const { createItemPurchased, deleteItemPurchased, getItemPurchased, getItemsPurchased, updateItemPurchased} = require('../controllers/itempurchased.controller');

router.route('/')
    .get(getItemsPurchased)
    .post(createItemPurchased)
    

router.route('/:id')
    .get(getItemPurchased)
    .put(updateItemPurchased)
    .delete(deleteItemPurchased)

module.exports = router;