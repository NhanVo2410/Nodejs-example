const Ticket = require('../models/ticket.model');
// const User = require('../models/user.model');

exports.getTickets = async () => {
  try {
    const ticket = await Ticket.find();
    return ticket;
  } catch (e) {
    // Log Errors
    throw Error('Error while get ticket');
  }
};
exports.postTicketsService = async (ticket, err) => {
  const ticketfinded = await Ticket.findOne({ Title: ticket.Title });
  if (!ticketfinded) {
    const ticketfinal = new Ticket(ticket);
    const result = ticketfinal.save();
    return result;
  }
  return err;
};
exports.GetTicketByIDService = async (id, err) => {
  const ticketfinded = await Ticket.findById(id);
  if (ticketfinded) {
    return ticketfinded;
  }
  return err;
};
exports.DeleteTicketsService = async (id) => {
  try {
    const result = await Ticket.remove({ _id: id });
    // const result = ticketfinded.remove();
    return result;
  } catch (err) {
    return err;
  }
};
exports.patchTicketsService = async (ticket, id) => {
  try {
    const result = await Ticket.update({ _id: id }, { $set: ticket });
    return result;
  } catch (err) {
    return err;
  }
};
// exports.patchTicketsService = async (ticket, id) => {
//   try {
//     const ticketfinded = await Ticket.findById(id);
//     if (ticketfinded) {
//       const setTicket = await ticketfinded.set(ticket);
//       console.log(setTicket);
//       const result = await setTicket.save();
//       console.log(result);
//       return result;
//     }
//   } catch (err) {
//     return err;
//   }
// };
exports.CreateTicketDetailByTicketIDService = async (newTicketDetail, ticket) => {
  try {
    ticket.TicketDetailID.push(newTicketDetail._id);
    await ticket.save();
    const result = await newTicketDetail.save();
    return result;
    // newTicket.owner = userexist;
    // newTicket.save();
    // userexist.ticket.push(newTicket._id);
    // // userexist.push(newTicket._id);
    // const resultTicket = await userexist.save();
    // return resultTicket;
  } catch (err) {
    throw Error('Error while create ticket-detail');
  }
};
exports.GetTicketDetailByTicketIDService = async (id) => {
  // const user = this.GetUsersbyId(userID);
  // const result = await user.populate('ticket').exec((err) => {
  try {
    const result = await Ticket.findById(id).populate('TicketDetailID');
    console.log(result);
    return result;
  } catch (err) {
    throw Error('Error while create ticket detail');
  }
};
// exports.FindUserExist = function (user, res) {
//   User.findOne({ UserName: user.UserName }, async (err, usertemp) => {
//     if (err) {
//       return res.status(400).send({
//         message: err,
//       });
//     } else if (usertemp) {
//       return res.status(403).send({
//         message: 'email is exist',
//       });
//     } else {
//       user.save((err1, usertemp1) => {
//         if (err1) {
//           return res.status(400).send({
//             message: err1,
//           });
//         }
//         return res.status(201).send({
//           message: 'succes',
//           data: user,
//         });
//       });
//     }
//   });
// };
