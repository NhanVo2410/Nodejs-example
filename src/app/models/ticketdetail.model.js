/* eslint-disable func-names */
const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema } = mongoose;

const tiketdetailModel = new Schema(
  {
    Description: { type: String },
    Note: { type: String },
  }, { timestamps: true },
);
// userModel.plugin(passportLocalMongoose);
module.exports = mongoose.model('tblHelpDesk_TicketDetail', tiketdetailModel);
