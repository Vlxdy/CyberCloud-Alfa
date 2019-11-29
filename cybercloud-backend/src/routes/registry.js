const { Router } = require('express');
const router = Router();
const rutasProtegidas = require('../configs/token')
const {createRegistry,deleteRegistry,getRegistries,getRegistry,updateRegistry, patchRegistry} = require('../controllers/registry.controller');

router.route('/')
    .get(getRegistries)
    .post(createRegistry)

router.route('/:id')
    .get(getRegistry)
    .put(updateRegistry)
    .delete(deleteRegistry)
    .patch(patchRegistry)

module.exports = router;