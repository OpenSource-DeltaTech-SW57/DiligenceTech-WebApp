import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Notifications } from '../../model/notifications.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NotificationApiServiceService } from '../../services/notification-api.service.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent implements OnInit, AfterViewInit {

  //Attributes

  notificationsData: Notifications;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'date_published', 'type', 'content'];
  @ViewChild(MatPaginator, {static: false})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})sort!: MatSort;
  isEditMode: boolean;



  isToggled = false;

  constructor(private notificationsApiService: NotificationApiServiceService, public themeService: CustomizerSettingsService ){
    this.isEditMode = false
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

  // private methods
  onEditMode(){
    this.themeService.toggleRTLEnabledTheme();
  }

  //CRUD Actions

  onDeleteMode(element: Notifications){
    this.deleteNotifications(element.id);
  }

  onCancelEdit(){
    this.resetEditSate();
    this.getAllNotifications();
  }

  onNotificationAdded(element: Notifications){
    this.notificationsData = element;
    this.createNotification();
    this.resetEditSate();
  }

  onNotificationUpdated(element: Notifications){
    this.notificationsData = element;
    this.updateNotifications();
    this.resetEditSate();
  }


  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  private resetEditSate():void{
    this.isEditMode = false;
    this.notificationsData = {} as Notifications;
  }

  private getAllNotifications() {
    this.notificationsApiService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createNotification(){
    this.notificationsApiService.create(this.notificationsData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((notifications: Notifications) =>{
        return notifications;
      });
    });
  };


  //lifecycle hooks

  private updateNotifications() {
    let notificationsToUpdate = this.notificationsData;
    this.notificationsApiService.update(this.notificationsData.id, notificationsToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((notification: Notifications) => {
        if (notification.id === response.id) {
          return response;
        }
        return notification;
      });
    });
  };

  private deleteNotifications(notificationId: number) {
    this.notificationsApiService.delete(notificationId).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((notification: Notifications) =>{
        return notification.id !== notificationId ? notification : false;
      });
    });
  };




}
