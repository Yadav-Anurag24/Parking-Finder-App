import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { ParkingLot } from '../models/parking-lot';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  constructor() {
    // Load bookings from local storage when the service is initialized
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      this._bookings.next(JSON.parse(savedBookings));
    }
  }

  // Public observable that components can subscribe to
  get bookings$(): Observable<Booking[]> {
    return this._bookings.asObservable();
  }

  createBooking(lot: ParkingLot) {
    const newBooking: Booking = {
      id: `booking_${Date.now()}`, // Simple unique ID
      lot: lot,
      bookingDate: new Date().toISOString()
    };

    const currentBookings = this._bookings.getValue();
    const updatedBookings = [...currentBookings, newBooking];

    this._bookings.next(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  }

  // ADD THIS NEW METHOD
  deleteBooking(bookingId: string) {
    const currentBookings = this._bookings.getValue();
    // Create a new array that excludes the booking with the matching ID
    const updatedBookings = currentBookings.filter(b => b.id !== bookingId);

    this._bookings.next(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  }
}
