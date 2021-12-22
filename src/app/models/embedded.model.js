/* eslint-disable func-names */
const mongoose = require('mongoose');
// const validator = require('validator');

const { Schema } = mongoose;
const address = new Schema({
  Street: { type: String },
  City: { type: String },
  State: { type: String },
});
const useremModel = new Schema(
  {
    Username: { type: String },
    FullName: { type: String },
    addresses: [address],
  }, { timestamps: true },
);

module.exports = mongoose.model('UserEmb', useremModel);
