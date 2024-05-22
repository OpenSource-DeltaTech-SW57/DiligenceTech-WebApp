import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { Area } from '../../model/area.entity';
import { AreaApiService } from '../../services/area-api.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-shared-drive',
  templateUrl: './shared-drive.component.html',
  styleUrl: './shared-drive.component.scss'
})
export class SharedDriveComponent implements OnInit, AfterViewInit{
    areaData: Area;
    areaDataArray: Array<Area>;
    displayedColumns: string[] = ['select', 'folderName', 'area', 'listedDate', 'fileSize', 'fileItems', 'action'];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);
    isEditMode: boolean;
    @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort!: MatSort;


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
        public themeService: CustomizerSettingsService, private areaApiService: AreaApiService, private datePipe: DatePipe
    ) {
        this.isEditMode = false;
        this.areaDataArray = [];
        this.areaData = {} as Area;
        this.dataSource = new MatTableDataSource<any>();
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    formatDate(dateString: string): string {
      return this.datePipe.transform(dateString, 'dd MMM, yyyy') || '';
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }


    onEditItem(element: Area) {
      this.isEditMode = true;
      this.areaData = element;
    }

    // CRUD Actions

    onDeleteItem(element: Area) {
      this.deleteArea(element.id);
      console.log("area deleted");
      this.getAllAreas();
    }

    onCancelEdit() {
      this.resetEditState();
      this.toggleClass();
      this.getAllAreas();
    }

    onAreaAdded(element: Area) {
      this.areaData.id = this.areaDataArray[this.areaDataArray.length-1].id+1;
      this.areaData = element;
      this.areaData.date = this.formatDate((new Date()).toISOString());
      this.areaData.action = {
        "download": "sim_card_download",
        "edit": "edit",
        "delete": "delete"
      }
      this.areaData.routerLink = element.title.toLowerCase()
      this.areaData.size = "7.5 GB";
      this.createArea();
      this.resetEditState();
      this.getAllAreas();
      this.toggleClass();
    }

    // UI Event Handlers

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
      this.getAllAreas();
    }

    private resetEditState(): void {
      this.isEditMode = false;
      this.areaData = {} as Area;
    }

    private getAllAreas() {
      this.areaApiService.getAll().subscribe((response: any) => {
        this.dataSource.data = response;
        this.areaDataArray = response;
        console.log(this.areaDataArray)
      });
    };

    private createArea() {
      // this.areaDataArray.push(this.areaData);
      // this.areaDataArray = this.areaDataArray.map((area: Area) => {
      //   return area;
      // })
      this.areaApiService.create(this.areaData).subscribe((response: any) => {
        this.dataSource.data.push({...response});
        this.dataSource.data = this.dataSource.data.map((area: Area) => {
          return area;
        });
      });
    };

    // Lifecycle Hooks

    private deleteArea(areaId: number) {
      // this.areaDataArray = this.areaDataArray.filter((area: Area) => {
      //   return area.id !== areaId ? area : false;
      // })
      this.areaApiService.delete(areaId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((area: Area) => {
          return area.id !== areaId ? area : false;
        });
      });
    };
}
