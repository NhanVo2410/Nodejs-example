const debug = require('debug')('user');
const chalk = require('chalk');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcrypt');
const Ticket = require('../models/ticket.model');
const UserService = require('../service/user.service');
const User = require('../models/user.model');
const logger = require('../../config/logger/logger.config');
const handle = require('../../../middleware/handleResponse.middleware');
const { error, success } = require('../../util/handleResponse.json');

exports.GetAll = async (_, res) => {
  try {
    const result = await UserService.GetAllUserService();
    if (result) {
      res.render('userList', { user: result });
    }
  } catch (err) {
    console.log(err);
    debug(chalk.redBright('error'));
    handle.responseError(res, error[0].status, error[0].message, err);
  }
};

exports.renderEditForm = async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  console.log(chalk.blue(user));
  res.render('edit-user', { user });
};

exports.GetAllUserAPI = async (req, res) => {
  try {
    const result = await UserService.GetAllUserService();
    return handle.responseOk(res, success[0].status, success[0].key, success[0].message, result);
    // return res.status(200).json({
    //   success: true,
    //   message: 'A list of all user',
    //   data: result,
    // });
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
    // res.status(500).json({
    //   success: false,
    //   message: 'Server error. Please try again.',
    //   error: err.message,
    // });
  }
};
exports.GetUserActiveByStatus = async (req, res) => {
  try {
    const result = await UserService.GetUserActiveByStatusService();
    return handle.responseOk(res, success[0].status, success[0].key, success[0].message, result);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};

exports.GetUsersByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const checkid = ObjectID.isValid(id);
    // console.log(checkid);
    if (checkid === true) {
      const result = await UserService.GetUsersByUserIDService(id);
      if (result) {
        const hidepass = await UserService.HidePass(result.id);
        return handle.responseOk(
          res, success[0].status, success[0].key, success[0].message, hidepass,
        );
      }
      // id is deleted and query 5fd81c967b8109234407f1c4
      return handle.responseError(res, error[6].status, error[6].key, error[6].message);
    }
    return handle.responseError(res, error[14].status, error[14].key, error[14].message);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
    // return res.status(500).json({
    //   success: false,
    //   message: 'Server error. Please try again.',
    //   error: e.message,
    // });
  }
};
// exports.HidePass = async (_id, err) => {
//   if (!_id) {
//     // eslint-disable-next-line no-throw-literal
//     throw err;
//   }
//   const temp1 = await User.findOne({ _id }, { Password: 0 });
//   if (!temp1) {
//     return {};
//   }
//   return temp1;
// };
// const {...} req.body to receive exacly field in client when its call
exports.Post = async (req, res) => {
  try {
    const {
      UserName,
      Password,
      FullName,
      Status,
      email,
    } = req.body;
    const user = {
      local: {
        UserName,
        email,
        Password,
      },
      info: {
        FullName,
        Status,
      },
    };
    // const user = new User();
    // user.info.FullName = FullName;
    // user.info.Status = Status;
    // user.local.UserName = UserName;
    // user.local.email = email;
    // user.local.Password = Password;
    if (!UserName) {
      return handle.responseError(
        res,
        error[1].status,
        error[1].key,
        error[1].message,
      );
      // return res.status(400).send({
      //   message: 'Please, enter username',
      // });
    }
    if (!Password) {
      return handle.responseError(res, error[1].status, error[1].key, error[1].message);
      // return res.status(400).send({
      //   message: 'Please, enter password',
      // });
    }
    if (!FullName) {
      return handle.responseError(res, error[1].status, error[1].key, error[1].message);
      // return res.status(400).send({
      //   message: 'Please, enter password',
      // });
    }
    const temp = user.local.UserName;
    const CheckUserExist = await UserService.FindUserExistWithUsername(temp);
    if (CheckUserExist) {
      return handle.responseError(res, error[4].status, error[4].key, error[4].message);
    }
    user.local.Password = bcrypt.hashSync(user.local.Password, 10);
    const UserCreated = await UserService.postUsersService(user);
    const result = await UserService.HidePass(UserCreated._id);
    console.log(result);
    return handle.responseOk(res,
      success[3].status,
      success[3].key,
      success[3].message,
      result);
    // return res.status(201).send({
    //   success: true,
    //   message: 'Create sucessfully',
    //   data: hidepass,
    //   // access_token : token,
    //   expiresIn: '1h',
    // });
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
    // res.status(500).json({
    //   success: false,
    //   message: 'Server error. Please try again.',
    //   error: err.message,
    // });
  }
};

exports.Delete = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.DeleteUsersService(id);
    // if (result) {
    //   return res.status(200).json({
    //     success: true,
    //     message: `User have id ${id} is delete`,
    //     data: result,
    //   });
    // }
    return res.redirect('back');
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};

exports.PathchUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (req.body.email) {
      user.local.email = req.body.email;
    }
    if (req.body.UserName) {
      user.local.UserName = req.body.UserName;
    }
    if (req.body.FullName) {
      user.info.FullName = req.body.FullName;
    }
    if (req.body.Age) {
      user.info.Age = req.body.Age;
    }
    await user.save();
    return res.redirect('/api/user');
  } catch {
    return res.status(404).send({ error: "Post doesn't exist!" });
  }
};

exports.Patch = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      UserName,
      FullName,
      Status,
      email,
      Group,
      Age,
    } = req.body;
    const newUser = {
      local: {
        UserName,
        email,
      },
      info: {
        FullName,
        Status,
        Group,
        Age,
      },
    };
    // const data = await User.findById({ _id: id });
    // console.log(data);
    // if (!Status) {
    //   newUser.info.Status = data.info.Status;
    // }

    if (!UserName) {
      return handle.responseError(
        res,
        error[1].status,
        error[1].key,
        error[1].message,
      );
    }
    if (!FullName) {
      return handle.responseError(res, error[1].status, error[1].key, error[1].message);
    }
    const result = await UserService.patchUsersService(newUser, id);
    // const result = await User.updateOne({ _id: id }, {
    //   $set: newUser,
    //   // $set: {
    //   //   'local.email': req.body.email,
    //   //   'local.UserName': req.body.UserName,
    //   //   'info.FullName': req.body.FullName,
    //   //   'info.Status': req.body.Status,
    //   //   'info.Group': req.body.Group,
    //   //   'info.Age': req.body.Age,
    //   // },
    // });
    return handle.responseOk(res, success[3].status, success[3].key, success[3].message, result);
    // return res.status(201).send({
    //   success: true,
    //   message: 'update sucessfully',
    //   data: result,
    //   // access_token : token,
    //   expiresIn: '1h',
    // });
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.CreateTicketByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newTicket = new Ticket(req.body);
    const user = await UserService.GetUsersByUserIDService(id);
    if (!user) {
      return handle.responseError(res, error[6].status, error[6].key, error[6].message);
    }
    const result = await UserService.CreateTicketbyUserService(newTicket, user);
    console.log(result);
    return handle.responseOk(res,
      success[3].status,
      success[3].key,
      success[3].message,
      result);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};
// await newTicket.save();
// eslint-disable-next-line no-underscore-dangle
// userexist.ticket.push(newTicket._id);
// userexist.push(newTicket._id);
// await userexist.save();
// res.status(201).json({ ticket: newTicket });
exports.GetTicketByUserID = async (req, res) => {
  try {
    const user = req.params;
    const result = await UserService.GetTicketByUserIDService(user);
    // const result = await User.findById(userID.id).populate('ticket');
    return handle.responseOk(res,
      success[0].status,
      success[0].key,
      success[0].message,
      result);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.GetUserByTime = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (start === '' || end === '') {
      return handle.responseError(res, error[15].status, error[15].key, error[15].message);
    }
    console.log({ start, end });
    const result = await UserService.GetUserByTimeService(start, end);
    if (result.length === 0) {
      return handle.responseError(res, error[12].status, error[12].key, error[12].message);
    }
    return handle.responseOk(res,
      success[0].status,
      success[0].key,
      success[0].message,
      result);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};
exports.GetUserhaveticketByGroup = async (req, res) => {
  try {
    const { group } = req.query;
    // const { numberticket } = req.query;
    console.log(group);
    // console.log(numberticket);
    // tickets: { $exists: true, $ne: [] },
    // $exists: true, $not: { $size: 0 }
    // $gt : []
    const query = {
      'info.Group': { $eq: group },
      tickets: { $exists: true, $not: { $size: 0 } },
    };
    console.log(query);
    const result = await User.find(query);
    console.log(result);
    if (!result) {
      return handle.responseError(res, error[6].status, error[6].key, error[6].message);
    }
    return handle.responseOk(res,
      success[0].status,
      success[0].key,
      success[0].message,
      result);
  } catch (err) {
    logger.error(err);
    debug(chalk.redBright('error'));
    return handle.responseError(res, error[0].status, error[0].message, err);
  }
};
