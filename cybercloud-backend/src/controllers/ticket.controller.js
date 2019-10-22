const ticketCtrl = {};

const Ticket = require('../models/Ticket');

ticketCtrl.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        return res.json(tickets)
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }

}
ticketCtrl.createTicket = async (req, res) => {
    try {
        const { id_user, id_operator, id_caja, id_rate } = req.body;
        const newTicket = new Ticket({
            id_user,
            id_operator,
            id_caja,
            id_rate
        });
        await newTicket.save();
        return res.send({status: true})
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
ticketCtrl.deleteTicket = async (req, res) => {
    try {
        await Ticket.deleteMany();
        return res.send({status:true});
    } catch (error) {
        return res.status(400).send({ status: false, error: err });
    }
}
ticketCtrl.getTicket = async (req, res) => {
}
ticketCtrl.updateTicket = async (req, res) => {
}

module.exports = ticketCtrl;