const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: { type: String, required: true },
  founded: { type: String, required: true },
  location: { type: Object, required: true },
  rating: { type: Date, required: false },
  courses: { type: Array, required: true },
  students: { type: Array, required: false },
}, {
  timestamps: true,
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;