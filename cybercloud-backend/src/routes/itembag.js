const { Router } = require('express');
const router = Router();

const {getItems, getItem, createItem, updateItem,deleteItem,deleteItems} = require('../controllers/itembag.controller');

router.route('/')
    .get(getItems)
    .post(createItem)
    .delete(deleteItems)

router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

module.exports = router;