/* eslint-disable func-names */
const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema } = mongoose;

const tiketModel = new Schema(
  {
    Title: { type: String },
    Description: { type: String },
    Status: { type: String },
    TicketDetailID: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tblHelpDesk_TicketDetail',
      },
    ],
  }, { timestamps: true },
);
module.exports = mongoose.model('tblHelpDesk_Ticket', tiketModel);
