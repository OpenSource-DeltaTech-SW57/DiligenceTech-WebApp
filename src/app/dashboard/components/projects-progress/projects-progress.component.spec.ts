import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProgressComponent } from './projects-progress.component';

describe('ProjectsProgressComponent', () => {
  let component: ProjectsProgressComponent;
  let fixture: ComponentFixture<ProjectsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
