import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootAuthenticationComponent } from './root-authentication.component';

describe('RootAuthenticationComponent', () => {
  let component: RootAuthenticationComponent;
  let fixture: ComponentFixture<RootAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootAuthenticationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
