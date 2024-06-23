import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCreateComponent } from './root-create.component';

describe('RootCreateComponent', () => {
  let component: RootCreateComponent;
  let fixture: ComponentFixture<RootCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
