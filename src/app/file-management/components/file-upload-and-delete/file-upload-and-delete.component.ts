import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { FileEntity } from '../../model/file.entity';
import { UploadFilesService } from '../../services/upload-files.service';

@Component({
  selector: 'app-file-upload-and-delete',
  templateUrl: './file-upload-and-delete.component.html',
  styleUrl: './file-upload-and-delete.component.scss'
})
export class FileUploadAndDeleteComponent {
  selectedFile: File | null = null;
  @Input() file: FileEntity;
  @Input() editMode = false;
  @Output() fileAdded = new EventEmitter<FileEntity>();
  @Output() fileUpdated = new EventEmitter<FileEntity>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('fileForm', {static:false}) fileForm!: NgForm;

  public multiple: boolean = false;
  isToggled = false;
  constructor(public themeService: CustomizerSettingsService, private uploadService: UploadFilesService){
    this.file = {} as FileEntity;
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if(fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  private resetEditState(){
    this.editMode = false;
    this.fileForm.resetForm();
    this.file = {} as FileEntity;
  }

  onSubmit() {
    // if(this.selectedFile){
    //   this.uploadService.uploadFile(this.selectedFile).subscribe(downloadURL => {
    //     console.log('Archivo subido, URL: ', downloadURL);
    //   })
    // }
    if (this.fileForm.form.valid){
      if(this.editMode){
        this.fileUpdated.emit(this.file);
      } else {
        this.fileAdded.emit(this.file);
      }
      this.resetEditState()
    } else {
      console.log("invalid data");
    }
  }
  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
