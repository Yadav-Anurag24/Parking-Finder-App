import { ParkingLot } from "./parking-lot";

export interface Booking {
  id: string; // A unique ID for the booking
  lot: ParkingLot;
  bookingDate: string; // The date the booking was made
}
