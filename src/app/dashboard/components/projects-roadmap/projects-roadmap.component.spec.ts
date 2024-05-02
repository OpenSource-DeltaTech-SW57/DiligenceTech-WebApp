import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsRoadmapComponent } from './projects-roadmap.component';

describe('ProjectsRoadmapComponent', () => {
  let component: ProjectsRoadmapComponent;
  let fixture: ComponentFixture<ProjectsRoadmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsRoadmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsRoadmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
