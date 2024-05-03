import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProjectsProfileComponent } from './total-projects-profile.component';

describe('TotalProjectsComponent', () => {
  let component: TotalProjectsProfileComponent;
  let fixture: ComponentFixture<TotalProjectsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalProjectsProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalProjectsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
