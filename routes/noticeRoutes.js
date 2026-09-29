import express from 'express';
import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getNotices)
  .post(authorize('admin', 'faculty'), createNotice);

router
  .route('/:id')
  .get(getNoticeById)
  .put(authorize('admin', 'faculty'), updateNotice)
  .delete(authorize('admin'), deleteNotice);

export default router;
