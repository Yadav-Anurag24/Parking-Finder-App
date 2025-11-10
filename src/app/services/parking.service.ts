import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ParkingLot } from '../models/parking-lot';
import { MOCK_PARKING_LOTS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor() { }

  getParkingLots(): Observable<ParkingLot[]> {
    return of(MOCK_PARKING_LOTS);
  }

  // This is the only version you need
  getParkingLotById(id: number): Observable<ParkingLot | undefined> {
    console.log('Service: Searching for lot with ID:', id);
    
    const lot = MOCK_PARKING_LOTS.find(p => p.id === id);
    
    console.log('Service: Found lot:', lot);
    
    return of(lot);
  }
}