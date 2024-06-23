import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootProjectManagementComponent } from './root-project-management.component';

describe('RootProjectManagementComponent', () => {
  let component: RootProjectManagementComponent;
  let fixture: ComponentFixture<RootProjectManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootProjectManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
