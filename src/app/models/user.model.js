/* eslint-disable func-names */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
// const validator = require('validator');

const { Schema } = mongoose;

const userModel = new Schema(
  {
    local: {
      email: { type: String },
      UserName: {
        type: String,
        minlength: 6,
        lowercase: true,
        trim: true,
      },
      Password: {
        type: String,
        require: true,
        // minlength: 6,
      },
    },
    info: {
      FullName: { type: String },
      Status: { type: String },
      Group: { type: String },
      Age: { type: Number },
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    tickets: [{
      type: Schema.Types.ObjectId,
      ref: 'tblHelpDesk_Ticket',
    }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  }, { timestamps: true },
);
userModel.methods.validPassword = function (Password) {
  return bcrypt.compareSync(Password, this.local.Password);
};
userModel.plugin(passportLocalMongoose);
module.exports = mongoose.model('tblHelpDesk_User', userModel);
