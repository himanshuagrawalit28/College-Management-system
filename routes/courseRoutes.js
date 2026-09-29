import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

// Subject endpoints
router
  .route('/subjects/all')
  .get(getSubjects);

router
  .route('/subjects')
  .post(authorize('admin'), createSubject);

router
  .route('/subjects/:id')
  .put(authorize('admin'), updateSubject)
  .delete(authorize('admin'), deleteSubject);

// Course endpoints
router
  .route('/')
  .get(getCourses)
  .post(authorize('admin'), createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(authorize('admin'), updateCourse)
  .delete(authorize('admin'), deleteCourse);

export default router;
