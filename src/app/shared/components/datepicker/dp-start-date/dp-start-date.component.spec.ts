import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpStartDateComponent } from './dp-start-date.component';

describe('DpStartDateComponent', () => {
  let component: DpStartDateComponent;
  let fixture: ComponentFixture<DpStartDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DpStartDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DpStartDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
