import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: ['./important.component.scss']
})
export class ImportantComponent {
  displayedColumns: string[] = ['select', 'to', 'cc', 'bcc', 'subject', 'body', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  importantEmails = [
    {
      to: ['john.doe@example.com'],
      cc: [],
      bcc: [],
      subject: 'Important Information',
      body: 'This is an important email with critical information...',
      date: '2023-05-15'
    },
    {
      to: ['jane.smith@example.com'],
      cc: ['boss@example.com'],
      bcc: [],
      subject: 'Urgent: Action Required',
      body: 'Please take action on this urgent matter...',
      date: '2023-05-12'
    }
    // Add more sample emails as needed
  ];

  constructor() {
    this.dataSource.data = this.importantEmails;
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  deleteSelectedRows() {
    this.selection.selected.forEach(item => {
      const index = this.importantEmails.findIndex(email => email === item);
      this.importantEmails.splice(index, 1);
    });
    this.dataSource.data = [...this.importantEmails];
    this.selection.clear();
  }

  deleteAllImportant() {
    this.importantEmails = [];
    this.dataSource.data = [];
    this.selection.clear();
  }

  // isToggled
  isToggled = false;
}
