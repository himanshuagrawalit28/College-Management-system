import express from 'express';
import {
  getFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from '../controllers/facultyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getFaculty)
  .post(authorize('admin'), createFaculty);

router
  .route('/:id')
  .get(getFacultyById)
  .put(authorize('admin'), updateFaculty)
  .delete(authorize('admin'), deleteFaculty);

export default router;
