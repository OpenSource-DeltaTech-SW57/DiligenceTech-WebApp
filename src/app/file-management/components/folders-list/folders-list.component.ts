import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {ActivatedRoute} from "@angular/router";
import {FoldersApiService} from "../../services/folders-api.service";
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";

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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
    private route: ActivatedRoute
  ) {
    this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
    });
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getFoldersByArea(params['areaId']);
      console.log(`xd: ${params['id']}`);
      this.setUserRole(params['id'], String(localStorage.getItem('user')));
    });
  }

  getFoldersByArea(area: string) {
    this.foldersApiService.getByArea(area).subscribe((response: any) => {
      console.log(response.length);
      this.dataSource.data = response;
    });
  }

  setUserRole(project: string, user: string) {
    this.projectsApiService.getProjectIfSellRole(project, user).subscribe((response: any) => {
      console.log(response.length);
      if (response.length != 0)
        this.setSellRole();
      else
        this.setBuyRole();
    });
  }

  setSellRole() {
    this.role = 'Sell-Side';
  }

  setBuyRole() {
    this.role = 'Buy-Side';
  }
}
