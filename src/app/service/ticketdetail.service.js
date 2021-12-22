const TicketDetail = require('../models/ticketdetail.model');

exports.getTicketsDetail = async () => {
  try {
    const ticket = await TicketDetail.find();
    return ticket;
  } catch (e) {
    // Log Errors
    throw Error('Error while get ticket');
  }
};
exports.GetTicketDetailByTicketIDService = async (id, err) => {
  const ticketfinded = await TicketDetail.findById(id);
  if (ticketfinded) {
    return ticketfinded;
  }
  return err;
};
exports.postTicketDetailService = async (ticketdetail, err) => {
  const ticketfinal = new TicketDetail(ticketdetail);
  const result = ticketfinal.save();
  if (err) {
    return err;
  }
  return result;
};
exports.DeleteTicketsService = async (id) => {
  try {
    const result = await TicketDetail.remove({ _id: id });
    // const result = ticketfinded.remove();
    return result;
  } catch (err) {
    return err;
  }
};
exports.patchTicketsService = async (ticketdetail, id) => {
  try {
    const result = await TicketDetail.update({ _id: id }, { $set: ticketdetail });

    return result;
  } catch (err) {
    return err;
  }
};
