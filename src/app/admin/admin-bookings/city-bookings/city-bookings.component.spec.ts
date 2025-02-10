import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBookingsComponent } from './city-bookings.component';

describe('CityBookingsComponent', () => {
  let component: CityBookingsComponent;
  let fixture: ComponentFixture<CityBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
