import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Body Parser & CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    message: 'Apex College Management API is operating normally',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server if executed directly
if (process.env.NODE_ENV !== 'test') {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[Apex Backend Server] Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
    });
  });
}

export default app;
