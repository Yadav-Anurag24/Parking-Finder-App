import { ParkingLot } from "../models/parking-lot";

export const MOCK_PARKING_LOTS: ParkingLot[] = [
  {
    id: 1,
    name: 'Pavilion Mall Parking',
    address: 'Fountain Chowk, Ludhiana, Punjab',
    location: { lat: 30.9064, lng: 75.8422 },
    totalSpots: 300,
    availableSpots: 120,
    pricePerHour: 60,
    rating: 4.4,
    amenities: ['CCTV', 'Covered Parking', 'Valet']
  },
  {
    id: 2,
    name: 'MBD Neopolis Mall Parking',
    address: 'Ferozepur Rd, Ludhiana, Punjab',
    location: { lat: 30.8842, lng: 75.8208 },
    totalSpots: 500,
    availableSpots: 250,
    pricePerHour: 70,
    rating: 4.2,
    amenities: ['CCTV', 'Multi-level']
  },
  {
    id: 3,
    name: 'Silver Arc Mall Parking',
    address: 'Ferozepur Rd, Ludhiana, Punjab',
    location: { lat: 30.8927, lng: 75.8324 },
    totalSpots: 250,
    availableSpots: 50,
    pricePerHour: 50,
    rating: 4.0,
    amenities: ['CCTV', 'Covered Parking']
  }
];