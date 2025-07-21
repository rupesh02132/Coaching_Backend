const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Add this if you want a custom numeric id
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String }, // New field
  duration: { type: String },   // New field
  level: { type: String },      // New field
  category: { type: String },   // New field
  rating: { type: Number },     // New field
  enrolled: { type: Number },   // New field
  thumbnail: { type: String },  // New field (store image URL or path)
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  schedule: {
    day: String,
    time: String
  }
});

module.exports = mongoose.model('Course', courseSchema);