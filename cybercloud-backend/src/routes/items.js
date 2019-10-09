const { Router } = require('express');
const router = Router();

const {getItems, getItem, createItem, deleteItem, updateItem} = require('../controllers/item.controller');

router.route('/')
    .get(getItems)
    .post(createItem)

router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

module.exports = router;