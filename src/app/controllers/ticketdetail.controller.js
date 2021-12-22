const TicketDetailService = require('../service/ticketdetail.service');

exports.GetAll = async (req, res) => {
  try {
    const result = await TicketDetailService.getTicketsDetail();
    return res.status(200).json({
      success: true,
      message: 'A list of all ticket detail',
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
exports.GetTicketDetailByTicketID = async (req, res) => {
  const { id } = req.params;
  const result = await TicketDetailService.GetTicketDetailByTicketIDService(id);
  if (result) {
    return res.status(200).send({
      success: true,
      message: `Ticket detail have id ${id} `,
      data: result,
    });
  }
  return res.status(404).send({
    success: false,
    message: 'ticket detail not exist',
  });
};
exports.Post = async (req, res) => {
  const ticketdetail = req.body;
  const result = await TicketDetailService.postTicketDetailService(ticketdetail);
  if (result) {
    return res.status(201).send({
      success: true,
      message: 'Create sucessfully',
      data: result,
    });
  }
  return res.status(404).send({
    data: false,
    message: 'server err',
  });
};
exports.Delete = async (req, res) => {
  const { id } = req.params;
  const result = await TicketDetailService.DeleteTicketsService(id);
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
    Description,
    Note,
  } = req.body;
  const ticketdetail = {
    Description,
    Note,
  };
  if (!Description) {
    return res.status(400).send({
      message: 'Please, enter title',
    });
  }
  const result = await TicketDetailService.patchTicketsService(ticketdetail, id);
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
