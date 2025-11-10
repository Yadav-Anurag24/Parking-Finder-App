import { Component, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ParkingLot } from '../../models/parking-lot';
import { ParkingService } from '../../services/parking.service';
import { GoogleMap } from '@angular/google-maps';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, GoogleMap]
})
export class MapPage { // Removed "AfterViewInit" for this new logic
  @ViewChild('map') mapComponent!: GoogleMap;
  
  // We declare these but do not initialize them yet
  infoWindow!: google.maps.InfoWindow;

  apiLoaded = false; // Tracks if the script is loaded

  // Map settings
  center: google.maps.LatLngLiteral = { lat: 30.9010, lng: 75.8573 };
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  constructor(
    private parkingService: ParkingService,
    private zone: NgZone,
    private router: Router
  ) {
    this.loadGoogleMapsApi(); // Start loading the script
  }
  
  loadGoogleMapsApi() {
    // Check if the script is already loaded
    if (this.apiLoaded) return;
    
    // Check if the script is already in the DOM (e.g., from a previous load)
    if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      this.apiLoaded = true;
      // It's loaded, but we need to wait for the map component to be ready
      // We'll use a small timeout to let the view initialize
      setTimeout(() => this.initializeMap(), 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      this.zone.run(() => {
        this.initializeMap();
      });
    };
  }
  
  initializeMap() {
    this.apiLoaded = true;
    // Now that the API is loaded, we can safely create Google Maps objects
    this.infoWindow = new google.maps.InfoWindow();
    this.loadAndDisplayMarkers();
  }

  loadAndDisplayMarkers() {
    // Check if the map or service is ready
    if (!this.mapComponent?.googleMap || !this.parkingService) {
      // If not, try again in a moment
      setTimeout(() => this.loadAndDisplayMarkers(), 100);
      return;
    }

    this.parkingService.getParkingLots().subscribe(lots => {
      for (const lot of lots) {
        const marker = new google.maps.Marker({
          position: lot.location,
          map: this.mapComponent.googleMap,
          title: lot.name,
        });

        marker.addListener('click', () => {
          const infoWindowContent = `
            <div style="color: black;">
              <h3>${lot.name}</h3>
              <p><strong>Available:</strong> ${lot.availableSpots} / ${lot.totalSpots}</p>
              <p><strong>Price:</strong> ₹${lot.pricePerHour}/hr</p>
              <a id="details-link" style="color: blue; text-decoration: underline; cursor: pointer;">View Details</a>
            </div>
          `;
          
          this.infoWindow.setContent(infoWindowContent);
          this.infoWindow.open(this.mapComponent.googleMap, marker);

          google.maps.event.addListenerOnce(this.infoWindow, 'domready', () => {
            document.getElementById('details-link')?.addEventListener('click', () => {
              this.zone.run(() => {
                this.router.navigate(['/details', lot.id]);
              });
            });
          });
        });
      }
    });
  }
}