const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
  maxMarks: { 
    type: Number, 
    required: true,
    min: 1,
    max: 100
  },
  submissions: [{
    student: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    submittedAt: { 
      type: Date, 
      default: Date.now 
    },
    grade: {
      type: Number,
      min: 0,
      max: 100
    },
    feedback: {
      type: String,
      trim: true
    },
    gradedAt: Date
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Indexes for faster queries
assignmentSchema.index({ course: 1 });
assignmentSchema.index({ teacher: 1 });
assignmentSchema.index({ 'submissions.student': 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);