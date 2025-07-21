const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  maxMarks: { type: Number, required: true },
  date: { type: Date, required: true },
  results: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    marksObtained: Number
  }]
});

module.exports = mongoose.model('Test', testSchema);