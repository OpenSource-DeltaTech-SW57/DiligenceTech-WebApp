import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {
  displayedColumns: string[] = ['select', 'title', 'description', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  trashedItems = [
    {
      title: 'Deleted: Old Proposal',
      description: 'This is an old proposal that was deleted...',
      date: '2023-05-15'
    },
    {
      title: 'Deleted: Meeting Notes',
      description: 'Meeting notes for last week\'s meeting...',
      date: '2023-05-12'
    },
    {
      title: 'Deleted: Reminder',
      description: 'A reminder for the upcoming event...',
      date: '2023-05-10'
    }
  ];

  constructor() {
    this.dataSource.data = this.trashedItems;
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
      const index = this.trashedItems.findIndex((d) => d === item);
      this.trashedItems.splice(index, 1);
    });
    this.dataSource.data = this.trashedItems;
    this.selection.clear();
  }

  getTrashCount(): number {
    return this.trashedItems.length;
  }
}
