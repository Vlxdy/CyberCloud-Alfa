const { Router } = require('express');
const router = Router();

const {createBox, deleteBox, getBox, getBoxs, updateBox, updateBoxes} = require('../controllers/box.controller');

router.route('/')
    .get(getBoxs)
    .post(createBox)
    .delete(deleteBox)
    .put(updateBoxes)

router.route('/:id')
    .get(getBox)
    .put(updateBox)
    .delete(deleteBox)

module.exports = router;