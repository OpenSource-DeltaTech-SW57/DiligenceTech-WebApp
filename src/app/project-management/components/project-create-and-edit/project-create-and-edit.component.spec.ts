import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateAndEditComponent } from './project-create-and-edit.component';

describe('ProjectCreateAndEditComponent', () => {
  let component: ProjectCreateAndEditComponent;
  let fixture: ComponentFixture<ProjectCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCreateAndEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
