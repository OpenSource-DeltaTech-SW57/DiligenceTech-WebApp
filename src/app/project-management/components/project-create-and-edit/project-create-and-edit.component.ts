import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project } from '../../model/project.entity';
import { NgForm } from '@angular/forms';
import {NgxEditorModule, Editor, Toolbar} from "ngx-editor";
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-project-create-and-edit',
  templateUrl: './project-create-and-edit.component.html',
  styleUrl: './project-create-and-edit.component.scss'
})
export class ProjectCreateAndEditComponent {
  @Input() project: Project;
  @Input() editMode = false;
  @Output() projectAdded = new EventEmitter<Project>();
  @Output() projectUpdated = new EventEmitter<Project>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('projectForm', {static:false}) projectForm!: NgForm;

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ]

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public multiple: boolean = false;

  isToggled = false;

  constructor(public themeService: CustomizerSettingsService) {
    this.project = {} as Project;
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  private resetEditState(){
    this.editMode = false;
    this.projectForm.resetForm();
    this.project = {} as Project;
  }

  onSubmit() {
    if (this.projectForm.form.valid){
      if(this.editMode){
        this.projectUpdated.emit(this.project);
      } else {
        this.resetEditState();
      }
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
