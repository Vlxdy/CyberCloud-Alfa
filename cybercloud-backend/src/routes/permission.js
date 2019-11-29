const { Router } = require('express');
const router = Router();

const { createPermission, deletePermission, getPermission, getPermissions, updatePermission } = require('../controllers/permissions.controller');

router.route('/')
    .get(getPermissions)
router.route('/:id')
    .get(getPermission)
    .post(createPermission)
    .put(updatePermission)
    .delete(deletePermission)
module.exports = router;