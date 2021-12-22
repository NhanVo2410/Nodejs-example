const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commnent' }],
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);
