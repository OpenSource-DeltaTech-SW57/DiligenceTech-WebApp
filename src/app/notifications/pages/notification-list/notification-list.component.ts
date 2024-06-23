import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Notifications } from '../../model/notifications.entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { NotificationApiService } from '../../services/notification-api.service';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'

})
export class NotificationListComponent implements OnInit {

  //Attributes

  notificationsData: Notifications;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: any[] = ['id', 'date_published', 'type', 'content'];
  @ViewChild(MatPaginator, {static: false})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})sort!: MatSort;
  isEditMode: boolean;


  ngOnInit(): void {
    this.getAllNotifications();
  }

  constructor(private notificationsApiService: NotificationApiService){
    this.isEditMode = false
    this.notificationsData = {} as Notifications;
    this.dataSource = new MatTableDataSource<any>();

  }



  // UI Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllNotifications() {
    this.notificationsApiService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };




}
