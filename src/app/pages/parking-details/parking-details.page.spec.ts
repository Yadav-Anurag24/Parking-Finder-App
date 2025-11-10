import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingDetailsPage } from './parking-details.page';

describe('ParkingDetailsPage', () => {
  let component: ParkingDetailsPage;
  let fixture: ComponentFixture<ParkingDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
