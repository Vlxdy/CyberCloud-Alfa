const { Router } = require('express');
const router = Router();

const {createBox, deleteBox, getBox, getBoxs, updateBox} = require('../controllers/box.controller');

router.route('/')
    .get(getBoxs)
    .post(createBox)
    .delete(deleteBox)

router.route('/:id')
    .get(getBox)
    .put(updateBox)
    .delete(deleteBox)

module.exports = router;