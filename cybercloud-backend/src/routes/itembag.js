const { Router } = require('express');
const router = Router();
const rutasProtegidas = require('../configs/token')
const {getItems, getItem, createItem, updateItem,deleteItem,deleteItems} = require('../controllers/itembag.controller');

router.route('/')
    .get(getItems)
    .post(createItem)
    .delete(deleteItems)

router.route('/:id')
    .get(rutasProtegidas, getItem)
    .put(updateItem)
    .delete(deleteItem)

module.exports = router;