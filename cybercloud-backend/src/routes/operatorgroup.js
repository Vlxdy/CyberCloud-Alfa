const { Router } = require('express');
const router = Router();

const { createOperatorGroup, deleteOperatorGroup, getOperatorGroup, getOperatorGroups, updateOperatorGroup, patchOperatorGroup } = require('../controllers/operatorgroup.controller');

router.route('/')
    .get(getOperatorGroups)
    .post(createOperatorGroup)
router.route('/:id')
    .get(getOperatorGroup)
    .put(updateOperatorGroup)
    .delete(deleteOperatorGroup)
    .patch(patchOperatorGroup)
module.exports = router;