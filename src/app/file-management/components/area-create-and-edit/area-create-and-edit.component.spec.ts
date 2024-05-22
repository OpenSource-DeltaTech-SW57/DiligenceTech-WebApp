import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreateAndEditComponent } from './area-create-and-edit.component';

describe('AreaCreateAndEditComponent', () => {
  let component: AreaCreateAndEditComponent;
  let fixture: ComponentFixture<AreaCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaCreateAndEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
