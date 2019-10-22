const { Router } = require('express');
const router = Router();

const {createPetitions, getPetition, deletePetitions, getPetitions, updatePetitions,deletePetition} = require('../controllers/petitions.controller');

router.route('/')
    .get(getPetitions)
    .post(createPetitions)
    .delete(deletePetitions)
router.route('/:id')
    .get(getPetition)
    .put(updatePetitions)
    .delete(deletePetition)
    

module.exports = router;