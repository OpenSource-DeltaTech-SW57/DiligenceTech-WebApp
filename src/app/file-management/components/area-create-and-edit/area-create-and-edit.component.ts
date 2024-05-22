import { Component, EventEmitter,Input, Output, ViewChild } from '@angular/core';
import { Area } from '../../model/area.entity';
import { NgForm } from '@angular/forms';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-area-create-and-edit',
  templateUrl: './area-create-and-edit.component.html',
  styleUrl: './area-create-and-edit.component.scss'
})
export class AreaCreateAndEditComponent {
  @Input() area: Area;
  @Input() editMode = false;
  @Output() areaAdded = new EventEmitter<Area>();
  @Output() areaUpdated = new EventEmitter<Area>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('areaForm', {static:false}) areaForm!: NgForm;

  isToggled = false;
  constructor(public themeService: CustomizerSettingsService){
    this.area = {} as Area;
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  private resetEditState(){
    this.editMode = false;
    this.areaForm.resetForm();
    this.area = {} as Area;
  }

  onSubmit() {
    if (this.areaForm.form.valid){
      if(this.editMode){
        this.areaUpdated.emit(this.area);
      } else {
        this.areaAdded.emit(this.area);
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
