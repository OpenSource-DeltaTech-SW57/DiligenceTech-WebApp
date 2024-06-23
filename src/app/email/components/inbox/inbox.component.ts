import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {
  displayedColumns: string[] = ['select', 'title', 'description', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
  }

  // isToggled
  isToggled = false;

  // Emails received
  emails = [
    {
      title: 'Hello from James',
      description: 'This is a test email from James.',
      date: '2023-05-18'
    },
    {
      title: 'Greetings from Andy',
      description: 'Hope you are doing well. This is Andy.',
      date: '2023-05-17'
    },
    {
      title: 'Important Notice',
      description: 'Please read the attached document carefully.',
      date: '2023-05-16'
    },
  ];

  constructor(public themeService: CustomizerSettingsService) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });

    this.dataSource.data = this.emails;
  }

  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }

  deleteSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.emails.findIndex((d) => d === item);
      this.emails.splice(index, 1);
    });
    this.dataSource.data = this.emails;
    this.selection.clear();
  }
}
