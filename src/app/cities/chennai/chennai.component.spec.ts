import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChennaiComponent } from './chennai.component';

describe('ChennaiComponent', () => {
  let component: ChennaiComponent;
  let fixture: ComponentFixture<ChennaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChennaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChennaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
