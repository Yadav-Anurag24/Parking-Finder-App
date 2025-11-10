import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ParkingService } from '../../services/parking.service';
import { ParkingLot } from '../../models/parking-lot';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.page.html',
  styleUrls: ['./parking-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ParkingDetailsPage implements OnInit {
  public lot: ParkingLot | undefined;

  constructor(
    private route: ActivatedRoute,
    private parkingService: ParkingService,
    private bookingService: BookingService,
    private toastController: ToastController
  ) { }

  // THIS IS THE METHOD YOU NEED TO FILL IN
  ngOnInit() {
    const lotIdFromUrl = this.route.snapshot.paramMap.get('id');
    console.log('Details Page: ID from URL is:', lotIdFromUrl);

    const lotId = Number(lotIdFromUrl);
    console.log('Details Page: Converted ID to number:', lotId);

    if (lotId) {
      this.parkingService.getParkingLotById(lotId).subscribe(data => {
        console.log('Details Page: Data received from service:', data);
        this.lot = data;
      });
    }
  }

  async bookNow() {
    if (this.lot) {
      this.bookingService.createBooking(this.lot);
      const toast = await this.toastController.create({
        message: 'Booking successful!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    }
  }
}