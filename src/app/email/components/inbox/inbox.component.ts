import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {MatSort} from "@angular/material/sort";
import {Email} from "../../model/email.entity";
import {EmailApiService} from "../../services/email-api.service";
import {response} from "express";
import {AgentApiService} from "../../../myprofile/services/agent-api.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['title', 'sender_email', 'date'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, {static: false})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})sort!: MatSort;

  isToggled = false;


  constructor(
    private emailApiService: EmailApiService,
    private agentApiService: AgentApiService,
    public themeService: CustomizerSettingsService
  ) {
    this.themeService.isToggled$.subscribe(
      isToggled =>{
        this.isToggled = isToggled;
      });

    this.dataSource = new MatTableDataSource<any>();

  }


  ngOnInit(): void {
    localStorage.setItem('receiver_id', String(localStorage.getItem('email')));

    if (localStorage.getItem('receiver_id') == null) {
      this.getEmailsByReceiverEmail(String(localStorage.getItem('receiver_id')))
      //this.getEmailsByReceiverEmail(String(localStorage.getItem(('receiver_id'))))
    }
  }


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


  // Dark Mode
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
  }
/*
  deleteSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.emails.findIndex((d) => d === item);
      this.emails.splice(index, 1);
    });
    this.dataSource.data = this.emails;
    this.selection.clear();
  }
*/

  getAllEmails(){
    this.emailApiService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;

    });

  }

  getEmailsByReceiverEmail(receiver_email: string){
    this.emailApiService.getByReceiverEmail(receiver_email).subscribe((response:any)=>{
      this.dataSource.data = response;
    })
  }


  protected readonly String = String;
}
