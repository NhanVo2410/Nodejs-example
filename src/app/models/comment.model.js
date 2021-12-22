const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'tblHelpDesk_User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
},
{
  timestamps: true,
});
// Export the model
module.exports = mongoose.model('Comment', CommentSchema);
