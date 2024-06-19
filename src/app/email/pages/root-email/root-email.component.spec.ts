import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootEmailComponent } from './root-email.component';

describe('RootEmailComponent', () => {
  let component: RootEmailComponent;
  let fixture: ComponentFixture<RootEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
