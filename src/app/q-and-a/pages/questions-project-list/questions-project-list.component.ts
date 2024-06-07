import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {Project} from "../../../project-management/model/project.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-questions-project-list',
  templateUrl: './questions-project-list.component.html',
  styleUrl: './questions-project-list.component.scss'
})
export class QuestionsProjectListComponent implements OnInit, AfterViewInit {

  // Attributes

  projectData: Project;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'projectName', 'startDate', 'endDate', 'projectManager', 'budget', 'teamMembers', 'progress', 'status', 'action'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  isEditMode: boolean;

  // isToggled
  isToggled = false;

  // Constructor

  constructor(private projectApiService: ProjectsApiService, public themeService: CustomizerSettingsService) {
    this.isEditMode = false;
    this.projectData = {} as Project;
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
    this.projectData = element;
  }

  // CRUD Actions

  onDeleteItem(element: Project) {
    this.deleteProject(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllProjects();
  }

  onProjectAdded(element: Project) {
    this.projectData = element;
    this.createProject();
    this.resetEditState();
  }

  onProjectUpdated(element: Project) {
    this.projectData = element;
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
    this.projectData = {} as Project;
  }

  private getAllProjects() {
    this.projectApiService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createProject() {
    this.projectApiService.create(this.projectData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((project: Project) => {
        return project;
      });
    });
  };

  // Lifecycle Hooks

  private updateProject() {
    let projectToUpdate = this.projectData;
    this.projectApiService.update(this.projectData.id, projectToUpdate).subscribe((response: any) => {
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
