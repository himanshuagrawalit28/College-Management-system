import express from 'express';
import {
  getTimetables,
  createOrUpdateTimetable,
  deleteTimetable,
} from '../controllers/timetableController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getTimetables)
  .post(authorize('admin', 'faculty'), createOrUpdateTimetable);

router
  .route('/:id')
  .delete(authorize('admin'), deleteTimetable);

export default router;
