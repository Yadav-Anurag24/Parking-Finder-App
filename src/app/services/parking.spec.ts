import { TestBed } from '@angular/core/testing';

import { Parking } from './parking.service';

describe('Parking', () => {
  let service: Parking;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Parking);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
