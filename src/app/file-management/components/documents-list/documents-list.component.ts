import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {CustomizerSettingsService} from "../../../shared/services/customizer-settings.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentsApiService} from "../../services/documents-api.service";
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { AgentEntity } from '../../model/agent.entity';
import { AgentApiService } from '../../../myprofile/services/agent-api.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.scss'
})
export class DocumentsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  role: string = ''
  agent!: AgentEntity;

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
    private documentsApiService: DocumentsApiService,
    private projectsApiService: ProjectsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private agentApiService: AgentApiService,
    private storage: AngularFireStorage
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
        console.log("reponse: " + response)
        console.log("agent: " + this.agent)
        this.role = response.agentRole;
    })

    this.setRole();

    this.route.params.subscribe(params => {
      this.getDocumentsByFolder(params['folderId']);
      this.setUserRole(params['id'], String(localStorage.getItem('user')));
    });
  }

  goAddFiles() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/create/documents/' + params['id'] + '/' + params['areaId'] + '/' + params['folderId']]);
    });
  }

  deleteDocument(docId: number, docName: string) {
    // delete in firebase first
    this.route.params.subscribe(params => {
      this.storage.ref(`${params['id']}/${params['areaId']}/${params['folderId']}/${docName}`).delete();
    });
    //const fileRef = this.storage.ref('documents/' + docId);
    // delete in back-end
    this.documentsApiService.delete(docId).subscribe((response: any) => {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        if (this.dataSource.data[i].id == docId) {
          console.log(this.dataSource.data[i].id)
          this.dataSource.data.splice(i, 1);
          this.dataSource._updateChangeSubscription();
          break;
        }
      }
    });
  }

  goCreateFolder() {
    this.route.params.subscribe(params => {
      this.router.navigate(['/create/folder/' + params['id'] + '/' + params['areaId']]);
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
    else if (this.agent.agentRole == "SELL AGENT"){
      this.role = 'Sell-Side';
    }
  }

  getDocumentsByFolder(folder: string) {
    this.documentsApiService.getByFolder(folder).subscribe((response: any) => {
      console.log(response.length);
      this.dataSource.data = response;
    });
  }

  getDocumentColor(filename: string): string {
    const extension = this.getFileExtension(filename);

    switch (extension) {
      case 'pdf':
        return '#ff4b4b';
      case 'doc':
      case 'docx':
        return '#5e74e7';
      case 'xls':
      case 'xlsx':
        return 'green';
      case 'ppt':
      case 'pptx':
        return 'orange';
      case 'txt':
        return 'grey';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'purple';
      case 'zip':
      case 'rar':
        return 'brown';
      case 'mp4':
      case 'mov':
      case 'avi':
        return 'black';
      case 'mp3':
      case 'wav':
        return 'yellow';
      default:
        return '#c0c0c0'; // Default color for unknown file types
    }
  }
  getFileExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return ''; // No extension found
    return fileName.substring(lastDotIndex + 1);
  }
}
