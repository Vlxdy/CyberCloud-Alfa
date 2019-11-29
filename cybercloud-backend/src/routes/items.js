const { Router } = require('express');
const router = Router();

const {getItems, getItem, createItem, deleteItem, updateItem, patchItem} = require('../controllers/item.controller');

router.route('/')
    .get(getItems)
    .post(createItem)

router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)
    .patch(patchItem)

module.exports = router;