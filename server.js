const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const { auth, role } = require('./middleware/auth');

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/teachers', require('./routes/teacher.routes'));
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/assignments', require('./routes/assignment.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/tests', require('./routes/test.routes'));
app.use('/api/resources', require('./routes/resource.routes'));
app.use('/api/batches', require('./routes/batch.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
