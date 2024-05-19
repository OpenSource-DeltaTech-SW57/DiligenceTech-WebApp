import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent {
  displayedColumns: string[] = ['select', 'to', 'cc', 'bcc', 'subject', 'body', 'date'];

  sentEmails = [
    {
      to: ['hello@james.com', 'hello@andy.com'],
      cc: ['cc@example.com'],
      bcc: ['bcc@example.com'],
      subject: 'Subject of the email 1',
      body: 'Body of the email 1...',
      date: '2023-05-16'
    },
    {
      to: ['hello@mateo.com'],
      cc: [],
      bcc: [],
      subject: 'Subject of the email 2',
      body: 'Body of the email 2...',
      date: '2023-05-15'
    },
    {
      to: ['hello@luca.com', 'hello@sausage.com'],
      cc: [],
      bcc: [],
      subject: 'Subject of the email 3',
      body: 'Body of the email 3...',
      date: '2023-05-14'
    }
  ];

  dataSource = new MatTableDataSource<any>(this.sentEmails);
  selection = new SelectionModel<any>(true, []);

  // RTL Mode
  isToggled = false;

  constructor() {}

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.sentEmails.forEach((email) => this.selection.select(email));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.sentEmails.length;
    return numSelected === numRows;
  }

  toggleRTLEnabledTheme() {
    this.isToggled = !this.isToggled;
  }

  deleteSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.sentEmails.findIndex((d) => d === item);
      this.sentEmails.splice(index, 1);
      this.dataSource = new MatTableDataSource<any>(this.sentEmails);
    });
    this.selection.clear();
  }
}
