const User = require('../models/user.model');

exports.HidePass = async (_id, err) => {
  if (!_id) {
    throw err;
  }
  const temp1 = await User.findOne({ _id }, { 'local.Password': 0 });
  if (!temp1) {
    return {};
  }
  return temp1;
};
exports.FindUserExistWithUsername = async (temp) => {
  try {
    const user = await User.findOne({ 'local.UserName': temp });
    return user;
  } catch (e) {
    throw Error('Error');
  }
};
exports.GetAllUserService = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (e) {
    // Log Errors
    throw Error('Error while get user');
  }
};
exports.GetUserActiveByStatusService = async () => {
  try {
    const user = await User.find({ 'info.Status': 'true' }, { 'local.Password': 0 });
    return user;
  } catch (e) {
    // Log Errors
    throw Error('Error while get user');
  }
};
exports.postUsersService = async (user) => {
  try {
    const userfinal = new User(user);
    const result = userfinal.save();
    console.log(result);
    return result;
  } catch (e) {
    throw Error('Error while post user');
  }
};
exports.GetUsersByUserIDService = async (id) => {
  try {
    const result = await User.findById(id);
    console.log(result);
    return result;
  } catch (e) {
    throw Error('Error while get user by id');
  }
};
// exports.GetUsersByUserIDService = async (user, err) => {
//   const result = await User.findById({ _id: user });
//   console.log(result);
//   if (result) {
//     return result;
//   } else {
//     return err;
//   }
// };
// // exports.GetUserByUserIDService = async (userId) => {
//   try {
//     const result = await User.findById(userId.id);
//     return result;
//   } catch (err) {
//     return err;
//   }
// };
exports.DeleteUsersService = async (id) => {
  try {
    const result = await User.remove({ _id: id });
    return result;
  } catch (err) {
    throw Error('Error while delete user by id');
  }
};
// exports.patchUsersService = async (newUser, user) => {
//   try {
//     const result = await User.updateMany({user.id},$set newuser);
//     if (userfinded) {
//       const setUser = await userfinded.set(newUser);
//       console.log(setUser);
//       const result = await setUser.save();
//       console.log(result);
//       return result;
//     }
//   } catch (err) {
//     return err;
//   }
// };
exports.patchUsersService = async (newUser, id) => {
  try {
    const result = await User.update({ _id: id }, { $set: newUser });
    // const result = await User.update({ _id: id }, { $set: newUser });
    return result;
  } catch (err) {
    throw Error('Error while update user by id');
  }
};
exports.CreateTicketbyUserService = async (newTicket, user) => {
  try {
    user.tickets.push(newTicket._id);
    await newTicket.save();
    const result = await user.save();
    return result;
    // newTicket.owner = userexist;
    // newTicket.save();
    // userexist.ticket.push(newTicket._id);
    // // userexist.push(newTicket._id);
    // const resultTicket = await userexist.save();
    // return resultTicket;
  } catch (err) {
    throw Error('Error while create ticket');
  }
};
exports.GetTicketByUserIDService = async (user) => {
  // const user = this.GetUsersbyId(userID);
  // const result = await user.populate('ticket').exec((err) => {
  try {
    const result = await User.findById(user.id).populate('tickets');
    console.log(result);
    return result;
  } catch (err) {
    throw Error('Error while create ticket');
  }
};
// #region cmt
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
// #endregion
exports.GetUserByTimeService = async (start, end) => {
  try {
    const result = await User.find({
      createdAt: {
        $gte: new Date(start).setHours(0, 0, 0),
        $lt: new Date(end).setHours(23, 59, 59),
      },
    });
    console.log(result);
    return result;
  } catch (e) {
    throw Error('Error while get user by time');
  }
};
