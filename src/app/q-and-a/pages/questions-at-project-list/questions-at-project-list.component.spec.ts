import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsAtProjectListComponent } from './questions-at-project-list.component';

describe('QuestionsAtProjectListComponent', () => {
  let component: QuestionsAtProjectListComponent;
  let fixture: ComponentFixture<QuestionsAtProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsAtProjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsAtProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
