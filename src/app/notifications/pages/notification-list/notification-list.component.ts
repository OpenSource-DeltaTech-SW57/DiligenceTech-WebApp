import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent {
  displayedColumns: string[] = ['notificationID', 'timestamp', 'type', 'content', 'status'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

}
