import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhemdabadComponent } from './ahemdabad.component';

describe('AhemdabadComponent', () => {
  let component: AhemdabadComponent;
  let fixture: ComponentFixture<AhemdabadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhemdabadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhemdabadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
