import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreationComponent } from './area-creation.component';

describe('AreaCreationComponent', () => {
  let component: AreaCreationComponent;
  let fixture: ComponentFixture<AreaCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
