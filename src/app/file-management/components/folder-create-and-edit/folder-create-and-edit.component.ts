import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Folder } from '../../model/folder.entity';
import { NgForm } from '@angular/forms';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-folder-create-and-edit',
  templateUrl: './folder-create-and-edit.component.html',
  styleUrl: './folder-create-and-edit.component.scss'
})
export class FolderCreateAndEditComponent {
  @Input() folder: Folder;
  @Input() editMode = false;
  @Output() folderAdded = new EventEmitter<Folder>();
  @Output() folderUpdated = new EventEmitter<Folder>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('folderForm', {static:false}) folderForm!: NgForm;

  isToggled = false;
  constructor(public themeService: CustomizerSettingsService){
    this.folder = {} as Folder;
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  private resetEditState(){
    this.editMode = false;
    this.folderForm.resetForm();
    this.folder = {} as Folder;
  }

  onSubmit() {
    if (this.folderForm.form.valid){
      if(this.editMode){
        this.folderUpdated.emit(this.folder);
      } else {
        this.folderAdded.emit(this.folder);
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
