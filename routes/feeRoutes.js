import express from 'express';
import {
  getFees,
  getFeeById,
  createFee,
  payFee,
  getFeeStats,
} from '../controllers/feeController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stats/overview', authorize('admin'), getFeeStats);

router
  .route('/')
  .get(getFees)
  .post(authorize('admin'), createFee);

router
  .route('/:id')
  .get(getFeeById);

router
  .route('/:id/pay')
  .post(payFee);

export default router;
