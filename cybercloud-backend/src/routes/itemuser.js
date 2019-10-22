const { Router } = require('express');
const router = Router();

const {createItem,deleteItem,deleteItems,getItem,getItems,updateItem} = require('../controllers/itemuser.controller');

router.route('/')
    .get(getItems)
    .post(createItem)
    .delete(deleteItems)

router.route('/:id')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

module.exports = router;