import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsProjectListComponent } from './questions-project-list.component';

describe('QuestionsProjectListComponent', () => {
  let component: QuestionsProjectListComponent;
  let fixture: ComponentFixture<QuestionsProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsProjectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
