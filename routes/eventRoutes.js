import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getEvents)
  .post(authorize('admin', 'faculty'), createEvent);

router
  .route('/:id')
  .get(getEventById)
  .put(authorize('admin', 'faculty'), updateEvent)
  .delete(authorize('admin'), deleteEvent);

export default router;
