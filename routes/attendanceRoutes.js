import express from 'express';
import {
  markAttendance,
  getStudentAttendance,
  getSubjectAttendance,
  getAttendanceStats,
} from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stats/overview', getAttendanceStats);
router.post('/mark', authorize('admin', 'faculty'), markAttendance);
router.get('/student/:studentId', getStudentAttendance);
router.get('/subject/:subjectId', authorize('admin', 'faculty'), getSubjectAttendance);

export default router;
