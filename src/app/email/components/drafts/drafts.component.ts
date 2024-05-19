import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent {
  displayedColumns: string[] = ['select', 'title', 'description', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  drafts = [
    {
      title: 'Draft: Project Proposal',
      description: 'This is a draft email for the project proposal...',
      date: '2023-05-15'
    },
    {
      title: 'Draft: Meeting Agenda',
      description: 'Here is the draft agenda for the upcoming meeting...',
      date: '2023-05-12'
    },
    {
      title: 'Draft: Vacation Request',
      description: 'I would like to request a vacation for the following dates...',
      date: '2023-05-10'
    }

  ];

  constructor() {

    this.dataSource.data = this.drafts;
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

  // isToggled
  isToggled = false;

}
