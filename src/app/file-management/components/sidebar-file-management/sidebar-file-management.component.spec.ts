import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFileManagementComponent } from './sidebar-file-management.component';

describe('SidebarFileManagementComponent', () => {
  let component: SidebarFileManagementComponent;
  let fixture: ComponentFixture<SidebarFileManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarFileManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarFileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
