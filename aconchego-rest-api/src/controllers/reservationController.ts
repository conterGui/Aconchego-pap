import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error });
  }
};

export const getAllReservations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    const reservations = await Reservation.find(filter).sort({ reservationDate: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

export const getReservationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservation', error });
  }
};

export const confirmReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableNumber, notes } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed', tableNumber, notes },
      { new: true, runValidators: true }
    );
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error confirming reservation', error });
  }
};

export const updateReservationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation', error });
  }
};

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      res.status(404).json({ message: 'Reservation not found' });
      return;
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
