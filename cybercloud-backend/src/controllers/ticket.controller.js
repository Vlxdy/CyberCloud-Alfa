const ticketCtrl = {};

const Ticket = require ('../models/Ticket');

ticketCtrl.getTickets = async(req,res)=> {
    const tickets = await Ticket.find();
    res.json(tickets)
}
ticketCtrl.createTicket = async (req,res)=> {
    const { id_user, id_operator, id_caja, id_rate } = req.body;
    const newTicket = new Ticket({
        id_user,
        id_operator,
        id_caja,
        id_rate
    });
    await newTicket.save();
    res.send("Ticket saved")
}
ticketCtrl.deleteTicket = async (req,res)=> {
    await Ticket.deleteMany();
    res.send("All of the tickes was deleted");
}
ticketCtrl.getTicket = async(req,res)=> {
}
ticketCtrl.updateTicket = async(req,res)=> {
}

module.exports = ticketCtrl;