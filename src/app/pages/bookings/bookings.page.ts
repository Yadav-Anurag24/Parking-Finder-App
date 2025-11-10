import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular'; // Import ToastController
import { Observable } from 'rxjs';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking';
import { trash } from 'ionicons/icons'; // Import the trash icon
import { addIcons } from 'ionicons'; // Import addIcons

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BookingsPage {
  public bookings$: Observable<Booking[]>;

  constructor(
    private bookingService: BookingService,
    private toastController: ToastController // Inject ToastController
  ) {
    this.bookings$ = this.bookingService.bookings$;
    addIcons({ trash }); // Make the trash icon available
  }

  // Add this new method
  async deleteBooking(bookingId: string) {
    this.bookingService.deleteBooking(bookingId);

    const toast = await this.toastController.create({
      message: 'Booking cancelled',
      duration: 2000,
      color: 'medium',
      position: 'top'
    });
    toast.present();
  }
}