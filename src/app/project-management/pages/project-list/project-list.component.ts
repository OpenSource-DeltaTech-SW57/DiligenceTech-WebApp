import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../model/project.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectsApiService } from '../../services/projects-api.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { CreateProject } from '../../model/create-project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, AfterViewInit {

  // Attributes

  // post
  projectDataPost: CreateProject;

  // get
  projectDataGet: Project;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'projectName', 'action'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  isEditMode: boolean;

  // isToggled
  isToggled = false;

  // Popup Trigger
  classApplied = false;
  toggleClass() {
      this.classApplied = !this.classApplied;
  }

  // Constructor

  constructor(private projectApiService: ProjectsApiService, public themeService: CustomizerSettingsService) {
    this.isEditMode = false;
    this.projectDataPost = {} as CreateProject;
    this.projectDataGet = {} as Project;
    this.dataSource = new MatTableDataSource<any>();
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  // RTL Mode
  toggleRTLEnabledTheme(){
    this.themeService.toggleRTLEnabledTheme();
  }

  // Private Methods

  onEditItem(element: Project) {
    this.isEditMode = true;
    this.projectDataGet = element;
  }

  // CRUD Actions

  onDeleteItem(element: Project) {
    this.deleteProject(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllProjects();
    this.toggleClass();
  }

  onProjectAdded(element: CreateProject) {
    this.projectDataPost = element;
    this.createProject();
    this.resetEditState();
    this.toggleClass();
  }

  onProjectUpdated(element: Project) {
    this.projectDataGet = element;
    this.updateProject();
    this.resetEditState();
  }

  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.projectDataGet = {} as Project;
  }

  private getUserProjects() {
    if (localStorage.getItem('user') != null) {
      console.log(`there is user: ${String(localStorage.getItem('user'))}`);
      this.projectApiService.getByUser(String(localStorage.getItem('user'))).subscribe((response: any) => {
        this.dataSource.data = response;
      });
    }
    else {
      console.log("no user");
    }
  }
  private getAllProjects() {
    //this.projectApiService.getAllProjectsLinkedAgent(String(localStorage.getItem('username'))).subscribe((response: any) => {
    this.projectApiService.getAllProjectsLinkedAgent("u20201b380").subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createProject() {
    this.projectApiService.create(this.projectDataPost).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((project: CreateProject) => {
        return project;
      });
    });
  };

  // Lifecycle Hooks

  private updateProject() {
    let projectToUpdate = this.projectDataGet;
    this.projectApiService.update(this.projectDataGet.id, projectToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((project: Project) => {
        if (project.id === response.id) {
          return response;
        }
        return project;
      });
    });
  };

  private deleteProject(projectId: number) {
    this.projectApiService.delete(projectId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((project: Project) => {
        return project.id !== projectId ? project : false;
      });
    });
  };

}
