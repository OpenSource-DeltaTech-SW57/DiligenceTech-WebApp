import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCreateAndEditComponent } from './folder-create-and-edit.component';

describe('FolderCreateAndEditComponent', () => {
  let component: FolderCreateAndEditComponent;
  let fixture: ComponentFixture<FolderCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FolderCreateAndEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FolderCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
