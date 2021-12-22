const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Category', CategorySchema);
