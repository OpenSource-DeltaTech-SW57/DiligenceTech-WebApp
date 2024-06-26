import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../model/project.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectsApiService } from '../../services/projects-api.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { CreateProject } from '../../model/create-project';
import { ProjectMember } from '../../model/project-member.entity';

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

  agentsSellSide!: string [];

  agentsBuySide !: string [];

  dataSource!: MatTableDataSource<any>;

  allDataSource !: MatTableDataSource<any>;
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
    this.allDataSource = new MatTableDataSource<any>();
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
    this.getAllProjectsLinked();
    this.getAllProjects()
    this.toggleClass();
  }

  async onProjectAdded(element: CreateProject) {
    this.projectDataPost = element;
    try {
      await this.createProject();
    } catch(error) {
      console.log("Error", error);
    }

    this.resetEditState();
    this.toggleClass();
  }

  onProjectMemberSellAddedToProject(element: string) {
      if(element.length != 0) {
          let agentsSell = element.replace(/\s+/g, '').split(",");
          console.log(agentsSell);
          this.agentsSellSide = agentsSell;
      }
  }

  onProjectMemberBuyAddedToProject(element: string) {
      if(element.length != 0) {
          let agentsBuy = element.replace(/\s+/g, '').split(",");
          console.log(agentsBuy);
          this.agentsBuySide = agentsBuy;
      }
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
    this.getAllProjectsLinked();
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

  private async getAllProjects() {
    this.projectApiService.getAllProjects().subscribe((response: any) => { this.allDataSource.data = response;
    })
  }

  private getAllProjectsLinked() {
    this.projectApiService.getAllProjectsLinkedAgent(String(localStorage.getItem('user'))).subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private async createProject() {
    this.projectApiService.createProject(this.projectDataPost).subscribe((response: any) => {
      this.createAgents(response.id);
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((project: CreateProject) => {
        return project;
      });
    });
  };


  private createAgents(projectId: number) {
    console.log("Agent Buy:" + this.agentsBuySide)
    console.log("Agent Sell:" + this.agentsSellSide)
    if(this.agentsBuySide.length != 0) {
      this.agentsBuySide.forEach((usernameAgent) => {
        this.addProjectMemberItemToProject(new ProjectMember("BUY AGENT"),projectId, usernameAgent);
      })
    }

    if(this.agentsSellSide.length != 0) {
      this.agentsSellSide.forEach((usernameAgent) => {
        this.addProjectMemberItemToProject(new ProjectMember("SELL AGENT"), projectId, usernameAgent);
      })
    }
  }

  private addProjectMemberItemToProject(member: ProjectMember, projectId: number, agentRecordId: string) {
    this.projectApiService.addProjectMemberItem(member,projectId, agentRecordId);
  }

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
