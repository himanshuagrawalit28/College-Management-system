import express from 'express';
import {
  createResult,
  getStudentResults,
  getSubjectResults,
  updateResult,
  deleteResult,
} from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(authorize('admin', 'faculty'), createResult);

router
  .route('/student/:studentId')
  .get(getStudentResults);

router
  .route('/subject/:subjectId')
  .get(authorize('admin', 'faculty'), getSubjectResults);

router
  .route('/:id')
  .put(authorize('admin', 'faculty'), updateResult)
  .delete(authorize('admin'), deleteResult);

export default router;
