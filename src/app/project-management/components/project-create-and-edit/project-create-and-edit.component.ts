import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project } from '../../model/project.entity';
import { NgForm } from '@angular/forms';
import {NgxEditorModule, Editor, Toolbar} from "ngx-editor";
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../services/projects-api.service";
import {CreateProject} from "../../model/create-project";
import {Router} from "@angular/router";
import { ProjectMember } from '../../model/project-member.entity';

@Component({
  selector: 'app-project-create-and-edit',
  templateUrl: './project-create-and-edit.component.html',
  styleUrl: './project-create-and-edit.component.scss'
})
export class ProjectCreateAndEditComponent {
  @Input() sellProjectMember!: string
  @Input() buyProjectMember!: string
  @Input() project: CreateProject;
  @Input() editMode = false;
  @Output() projectAdded = new EventEmitter<CreateProject>();
  @Output() projectUpdated = new EventEmitter<CreateProject>();
  @Output() projectMemberSellAddedToProject = new EventEmitter<string>();
  @Output() projectMemberBuyAddedToProject = new EventEmitter<string>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('projectForm', {static:false}) projectForm!: NgForm;

  // projectName: string = '';
  sellAgents: string = '';
  buyAgents: string = '';

  //editor!: Editor;
  //toolbar: Toolbar = [
  //  ['bold', 'italic'],
  //  ['underline', 'strike'],
  //  ['code', 'blockquote'],
  //  ['ordered_list', 'bullet_list'],
  //  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  //  ['link', 'image'],
  //  ['text_color', 'background_color'],
  //  ['align_left', 'align_center', 'align_right', 'align_justify'],
  //]

  //ngOnInit(): void {
  //  this.editor = new Editor();
  //}

  //ngOnDestroy(): void {
  //  this.editor.destroy();
  //}

  public multiple: boolean = false;

  isToggled = false;

  constructor(public themeService: CustomizerSettingsService) {
    this.project = {} as CreateProject;
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  // constructor(public themeService: CustomizerSettingsService, private projectsApiService: ProjectsApiService,
  //             private router: Router) {
  //   this.project = {} as Project;
  //   this.themeService.isToggled$.subscribe(_isToggled => {
  //     this.isToggled = _isToggled;
  //   })
  // }

  private resetEditState(){
    this.editMode = false;
    this.projectForm.resetForm();
    this.project = {} as CreateProject;
  }

  // onSubmit() {
  //   if (this.projectForm.form.valid) {
  //     let createProject = new CreateProject(this.projectName, this.usableSellAgentsInput(), this.usableBuyAgentsInput());
  //     this.projectsApiService.create(createProject).subscribe({
  //       next: (response) => {
  //         // Navigate to the desired route after successful creation
  //         this.router.navigate(['/project-management/all-projects']);
  //       },
  //       error: (error) => {
  //         // Handle error
  //         console.error('Error creating project', error);
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.projectForm.form.valid){
      if(this.editMode){
        this.projectUpdated.emit(this.project);
      } else {
        this.projectAdded.emit(this.project);
        this.projectMemberBuyAddedToProject.emit(this.buyProjectMember);
        this.projectMemberSellAddedToProject.emit(this.sellProjectMember);
      }
      this.resetEditState()
    } else {
      console.log("invalid data");
    }
  }

  // private usableSellAgentsInput() {
  //   return this.sellAgents.replace(' ','').split(',');
  // }
  // private usableBuyAgentsInput() {
  //   return this.buyAgents.replace(' ','').split(',');
  // }

  // onCancel() {
  //   this.router.navigate(['/project-management/all-projects']);
  // }

  onCancel() {
    this.resetEditState();
    this.editCanceled.emit();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
}
