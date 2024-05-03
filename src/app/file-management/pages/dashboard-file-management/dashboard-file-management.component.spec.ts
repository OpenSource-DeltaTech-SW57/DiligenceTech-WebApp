import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFileManagementComponent } from './dashboard-file-management.component';

describe('DashboardFileManagementComponent', () => {
  let component: DashboardFileManagementComponent;
  let fixture: ComponentFixture<DashboardFileManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardFileManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardFileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
