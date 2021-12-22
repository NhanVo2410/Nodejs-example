const TicketService = require('../service/ticket.service');
const TicketDetail = require('../models/ticketdetail.model');

// const Ticket = require('../models/ticket.model');

exports.GetAll = async (req, res) => {
  try {
    const result = await TicketService.getTickets();
    return res.status(200).json({
      success: true,
      message: 'A list of all ticket',
      data: result,

    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message,
    });
  }
};
exports.GetTicketByUserID = async (req, res) => {
  const { id } = req.params;
  const result = await TicketService.GetTicketByIDService(id);
  if (result) {
    return res.status(200).send({
      success: true,
      message: `Ticket have id ${id} `,
      data: result,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'ticket not exist',
  });
};
exports.Post = async (req, res) => {
  const ticket = req.body;
  if (!ticket.Title) {
    return res.status(400).send({
      message: 'Please, enter title',
    });
  }
  const result = await TicketService.postTicketsService(ticket);
  if (result) {
    return res.status(201).send({
      success: true,
      message: 'Create sucessfully',
      data: result,
    });
  }
  return res.status(404).send({
    data: false,
    message: 'Title already exist. Please, rename your title',
  });
};
exports.Delete = async (req, res) => {
  const { id } = req.params;
  const result = await TicketService.DeleteTicketsService(id);
  if (result) {
    return res.status(200).json({
      success: true,
      message: `Ticket have id ${id} is delete`,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Server error. Please try again.',
  });
};
exports.Patch = async (req, res) => {
  const { id } = req.params;
  const {
    Title,
    Description,
    Status,
  } = req.body;
  const ticket = {
    Title,
    Description,
    Status,
  };
  if (!Title) {
    return res.status(400).send({
      message: 'Please, enter title',
    });
  }
  const result = await TicketService.patchTicketsService(ticket, id);
  console.log(result);
  if (result) {
    return res.status(201).send({
      success: true,
      message: 'update sucessfully',
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Server error. Please try again.',
  });
};
exports.CreateTicketDetailByTicketID = async (req, res) => {
  const { id } = req.params;
  const newTicketDetail = new TicketDetail(req.body);
  console.log(newTicketDetail);
  const ticket = await TicketService.GetTicketByIDService(id);
  console.log(ticket);
  if (!ticket) {
    return res.status(400).json({
      message: 'Ticket not found',
    });
  }
  const result = await TicketService.CreateTicketDetailByTicketIDService(newTicketDetail, ticket);
  console.log(result);
  if (result) {
    return res.status(201).send({
      success: true,
      message: ' create success',
      data: result,
    });
  }
  return res.status(500).json({
    message: 'Error Server',
    success: false,
  });
};
exports.GetTicketDetailByTicketID = async (req, res) => {
  const { id } = req.params;
  const result = await TicketService.GetTicketDetailByTicketIDService(id);
  // const result = await User.findById(userID.id).populate('ticket');
  if (result) {
    return res.status(200).send({
      ticket: result.ticket,
      message: 'sucess',
      data: result,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Server error. Please try again.',
  });
};
