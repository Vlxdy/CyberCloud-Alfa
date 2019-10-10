const { Router } = require('express');
const router = Router();

const {getTickets, getTicket, createTicket, updateTicket,deleteTicket } = require('../controllers/ticket.controller');

router.route('/')
    .get(getTickets)
    .post(createTicket)
    .delete(deleteTicket)

router.route('/:id')
    .get(getTicket)
    .put(updateTicket)


module.exports = router;