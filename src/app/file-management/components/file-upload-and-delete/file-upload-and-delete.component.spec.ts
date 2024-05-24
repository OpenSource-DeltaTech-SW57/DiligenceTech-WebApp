import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadAndDeleteComponent } from './file-upload-and-delete.component';

describe('FileUploadAndDeleteComponent', () => {
  let component: FileUploadAndDeleteComponent;
  let fixture: ComponentFixture<FileUploadAndDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadAndDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileUploadAndDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
