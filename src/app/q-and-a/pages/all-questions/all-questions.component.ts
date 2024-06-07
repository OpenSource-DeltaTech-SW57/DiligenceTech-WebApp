import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MessagesApiService} from "../../services/messages-api.service";
import {Message} from "../../model/message.entity";

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrl: './all-questions.component.scss'
})
export class AllQuestionsComponent implements OnInit, AfterViewInit {
  // Attributes

  messageData: Message;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['projectId','id', 'questioner', 'content'];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  isEditMode: boolean;

  // isToggled
  isToggled = false;

  // Constructor

  constructor(private messageApiService: MessagesApiService, public themeService: CustomizerSettingsService) {
    this.isEditMode = false;
    this.messageData = {} as Message;
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

  onEditItem(element: Message) {
    this.isEditMode = true;
    this.messageData = element;
  }

  // CRUD Actions

  onDeleteItem(element: Message) {
    this.deleteMessage(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getQuestions();
  }

  onProjectAdded(element: Message) {
    this.messageData = element;
    this.createProject();
    this.resetEditState();
  }

  onProjectUpdated(element: Message) {
    this.messageData = element;
    this.updateProject();
    this.resetEditState();
  }

  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.messageData = {} as Message;
  }

  private getQuestions() {
    this.messageApiService.getQuestions().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createProject() {
    this.messageApiService.create(this.messageData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((project: Message) => {
        return project;
      });
    });
  };

  // Lifecycle Hooks

  private updateProject() {
    let projectToUpdate = this.messageData;
    this.messageApiService.update(this.messageData.id, projectToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((message: Message) => {
        if (message.id === response.id) {
          return response;
        }
        return message;
      });
    });
  };

  private deleteMessage(messageId: number) {
    this.messageApiService.delete(messageId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((message: Message) => {
        return message.id !== messageId ? message : false;
      });
    });
  };
}
