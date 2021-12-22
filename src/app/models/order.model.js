const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'tblHelpDesk_User' },
  orderitems: [
    {
      productid: Schema.Types.ObjectId,
      productname: String,
      price: Number,
      qty: Number,
    },
  ],
  totalprice: Number,
},
{
  timestamps: true,
});
// Export the model
module.exports = mongoose.model('Order', OrderSchema);
