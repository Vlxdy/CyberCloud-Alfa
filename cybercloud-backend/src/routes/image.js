const { Router } = require('express');
const router = Router();

const { createImage,getImage,deleteImage,updateImage,getImages} = require('../controllers/image.controller');

router.route('/')
    .get(getImages)
    .post(createImage)

router.route('/:id')
    .get(getImage)
    .put(updateImage)
    .delete(deleteImage)

module.exports = router;