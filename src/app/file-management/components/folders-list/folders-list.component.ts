import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FoldersApiService} from "../../services/folders-api.service";
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";
import { AgentEntity } from '../../model/agent.entity';
import { AgentApiService } from '../../../myprofile/services/agent-api.service';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.scss'
})
export class FoldersListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  role: string = '';
  agent!: AgentEntity;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected: number = this.selection.selected.length;
    const numRows: number = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.folderName + 1}`;
  }

  // Popup Trigger
  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  // isToggled
  isToggled = false;

  constructor(
    public themeService: CustomizerSettingsService,
    private foldersApiService: FoldersApiService,
    private projectsApiService: ProjectsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private agentApiService: AgentApiService
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
    this.dataSource = new MatTableDataSource<any>();
    this.agent = {} as AgentEntity;
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.agentApiService.getAgentDataByUsernameAndProjectId(String(localStorage.getItem("user")), Number(localStorage.getItem("projectId"))).subscribe((response:any) => {
        this.agent = response;
        this.role = response.agentRole;
    })


    this.setRole();

    this.route.params.subscribe(params => {
      this.getFoldersByArea(params['areaId']);
      console.log(`xd: ${params['id']}`);
      this.setUserRole(params['id'], String(localStorage.getItem('user')));
    });
  }

  goCreateFolder() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/create/folder/' + params['id'] + '/' + params['areaId']]);
    });
  }

  getFoldersByArea(area: string) {
    this.foldersApiService.getByArea(area).subscribe((response: any) => {
      //console.log(response.length);
      this.dataSource.data = response;
    });
  }

  setUserRole(project: string, user: string) {
    console.log(project, user);
    this.setRole();
  }

  setRole() {
    if(this.agent.agentRole == "BUY AGENT"){
      console.log(this.agent.agentRole);
      this.role = 'Buy-Side';
    }
    else if(this.agent.agentRole == "SELL AGENT"){
      this.role = 'Sell-Side';
    }
  }
}
