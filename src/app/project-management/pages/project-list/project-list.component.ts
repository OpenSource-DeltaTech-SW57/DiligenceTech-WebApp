import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../model/project.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectsApiService } from '../../services/projects-api.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, AfterViewInit{

  // Attributes

  projectData: Project;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'projectName', 'startDate', 'endDate', 'projectManager', 'budget', 'teamMembers', 'progress', 'status', 'action'];
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

  constructor(private projectApiService: ProjectsApiService, public themeService: CustomizerSettingsService, private datePipe: DatePipe) {
    this.isEditMode = false;
    this.projectData = {} as Project;
    this.dataSource = new MatTableDataSource<any>();
    this.themeService.isToggled$.subscribe(_isToggled => {
      this.isToggled = _isToggled;
    })
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd MMM, yyyy') || '';
  }

  transformTeamMembers(members: any): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    if(Array.isArray(members)){
      members.forEach((member, index) => {
        const key = `img${index + 1}`;
        result[key] =  member;
      });
    }
    return result;
  }

  tranformTags(tags: any): {[key: string]: string} {
    const result: { [key: string]: string } = {};
    if(Array.isArray(tags)){
      tags.forEach((tag, index) => {
        const key = `option${index + 1}`;
        result[key] =  tag;
      });
    }
    return result;
  }

  tranformStatus(status: any): {[key: string]: string}{
    if(typeof status === "string"){
      const result: { [key: string]: string } = JSON.parse(status);
      return result;
    }
    console.log("Error: failed convertion string status to {}")
    return {}
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
    this.toggleClass();
    this.getAllProjects();
  }

  onProjectAdded(element: Project) {
    this.projectData = element;
    this.projectData.progress = 0;
    this.projectData.action = {
      "view": "visibility",
      "delete": "delete"
    }
    this.projectData.startDate = this.formatDate(element.startDate);
    this.projectData.endDate = this.formatDate(element.endDate);
    this.projectData.teamMembers = this.transformTeamMembers(element.teamMembers);
    this.projectData.projectTags = this.tranformTags(element.projectTags);
    this.projectData.status = this.tranformStatus(element.status);
    this.createProject();
    this.resetEditState();
    this.toggleClass();
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
