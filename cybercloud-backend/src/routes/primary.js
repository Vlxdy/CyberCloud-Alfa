const { Router } = require('express');
const router = Router();

const {createPrimary,deletePrimary,getPrimary,updatePrimary, getPrimaries} = require('../controllers/primary.controller');

router.route('/')
    .get(getPrimaries)
    .post(createPrimary)
router.route('/:id')
    .get(getPrimary)
    .put(updatePrimary)
    .delete(deletePrimary)

module.exports = router;