import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.scss']
})
export class SpamComponent {
  displayedColumns: string[] = ['select', 'title', 'description', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  spamEmails = [
    {
      title: 'Spam: Claim Your Prize',
      description: 'You have won a lottery. Click here to claim your prize...',
      date: '2023-05-20'
    },
    {
      title: 'Spam: Urgent Action Required',
      description: 'Please provide your bank details to receive a huge sum of money...',
      date: '2023-05-19'
    },
    {
      title: 'Spam: Free Vacation Package',
      description: 'Congratulations! You have won a free vacation package...',
      date: '2023-05-18'
    }
  ];

  constructor() {
    this.dataSource.data = this.spamEmails;
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

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
  }

  deleteSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.spamEmails.findIndex((d) => d === item);
      this.spamEmails.splice(index, 1);
    });
    this.dataSource.data = this.spamEmails;
    this.selection.clear();
  }
}
