import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";
import {AreaApiService} from "../../services/area-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {response} from "express";
import {AreaCreationComponent} from "../area-creation/area-creation.component";
import {Dialog} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shared-drive',
  templateUrl: './shared-drive.component.html',
  styleUrl: './shared-drive.component.scss'
})
export class SharedDriveComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  role: string = '';
  readonly dialog = inject(MatDialog);

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

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
        private areaApiService: AreaApiService,
        private projectsApiService: ProjectsApiService,
        private route: ActivatedRoute,
        private router: Router
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
          this.getAreasByProject(params['id']);
          this.setUserRole(params['id'], String(localStorage.getItem('user')));
        });
    }

    getAreasByProject(project: string) {
      this.areaApiService.getByProject(project).subscribe((response: any) => {
        console.log(response.length);
        this.dataSource.data = response;
      });
    }

  setUserRole(project: string, user: string) {
    this.projectsApiService.getProjectIfSellRole(project, user).subscribe((response: any) => {
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

  goCreateArea() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/create/area/' + params['id']]);
    });
  }

  toAreaCreation() {
    let dialogRef = this.dialog.open(AreaCreationComponent, {
      height: '400px',
      width: '600px',
    });
  }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }


}
