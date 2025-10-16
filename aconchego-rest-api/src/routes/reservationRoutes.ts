import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  confirmReservation,
  updateReservationStatus,
  deleteReservation
} from '../controllers/reservationController';

const router = Router();

// Public routes
router.post('/', createReservation);

// Admin routes
router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.patch('/:id/confirm', confirmReservation);
router.patch('/:id/status', updateReservationStatus);
router.delete('/:id', deleteReservation);

export default router;
