import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Notifications } from '../../model/notifications.entity';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationApiServiceService } from '../../services/notification-api.service.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent {

  //Attributes
  notificationsData: Notifications = new Notifications;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['notificationID', 'timestamp', 'type', 'content', 'status'];
  @ViewChild(MatPaginator, {static: false})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})sort!: MatSort;

  selection = new SelectionModel<any>(true, []);

  //edit mode para borrar notificaciones antiguas
  isEditMode: boolean;
  
  isToggled = false;

  constructor(private notificationsApiService: NotificationApiServiceService, public themeService: CustomizerSettingsService ){
    this.isEditMode = false;
    this.notificationsData = {} as Notifications;
    this.dataSource = new MatTableDataSource<any>();
    this.themeService.isToggled$.subscribe(_isToggled =>{
      this.isToggled = _isToggled;
    })
  }

  // RTL Node
  toggleRTLEnabledTheme(){
    this.themeService.toggleRTLEnabledTheme();
  }

  //private methodes

  onEditItem(element: Notifications) {
    this.isEditMode = true;
    this.notificationsData = element;
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllNotifications();
  }

  // CRUD actions

  onDeleteItems(element: Notifications){
    this.deleteNotifications(element.id);
  }

  //Para la creacion de notificaciones se debería de crear a base de eventos que estén en la aplicación...
  //Así q x el momento dejaremos está parte del CRUD sin eso. pq no se supone que el mismo usuario lo haga.
  

  
  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllNotifications();
  }



  private resetEditState(): void{
    this.isEditMode = false;
    this.notificationsData = {} as Notifications;
  }

  private getAllNotifications() {
    this.notificationsApiService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };


  // Lifecycle Hooks
/*
  private updateNotifications() {
    let notificationsToUpdate = this.notificationsData;
    this.notificationsApiService.update(this.notificationsData.notificationID, notificationsToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((notification: Notifications) => {
        if (notification.notificationID === response.id) {
          return response;
        }
        return notification;
      });
    });
  };
*/

  private deleteNotifications(notificationId: number) {
    this.notificationsApiService.delete(notificationId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((notification: Notifications) => {
        return notification.id !== notificationId ? notification : false;
      });
    });
  };




}
