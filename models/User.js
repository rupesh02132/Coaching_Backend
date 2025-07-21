const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Suspended','pending'],
    default: 'Active',
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
}, { timestamps: true });

// Password hashing middleware
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Password verification method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);