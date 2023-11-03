const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const highlightSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  feeling: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Highlight = mongoose.model('Highlight', highlightSchema);

module.exports = Highlight;