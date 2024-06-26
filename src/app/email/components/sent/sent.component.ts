import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {EmailApiService} from "../../services/email-api.service";
import {AgentApiService} from "../../../myprofile/services/agent-api.service";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent implements OnInit{

  displayedColumns: string[] = [ 'title','receiver_email', 'date'];
  dataSource = new MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator, {static: false})paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false})sort!: MatSort;

  // RTL Mode
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
    localStorage.setItem('sender_id', String(localStorage.getItem('email')));

    this.getEmailsBySenderEmail(String(localStorage.getItem('sender_id')))

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEmailsBySenderEmail(sender_email: string){
    this.emailApiService.getBySenderEmail(sender_email).subscribe((response:any)=>{
      this.dataSource.data = response;
    });

  }



  /*
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


   */
}
