export interface ParkingLot {
  id: number;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  rating?: number; // The '?' makes this property optional
  amenities?: string[]; // e.g., ['CCTV', 'EV Charging']
}