import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateAndEditComponent } from './user-create-and-edit.component';

describe('UserCreateAndEditComponent', () => {
  let component: UserCreateAndEditComponent;
  let fixture: ComponentFixture<UserCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateAndEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
