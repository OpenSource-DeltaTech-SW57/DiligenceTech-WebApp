import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { Folder } from '../../model/folder.entity';
import { FolderApiService } from '../../services/folder-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent {
    folderData: Folder;
    folderDataArray: Array<Folder>;
    isEditMode: boolean;


    // isToggled
    isToggled = false;

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        public themeService: CustomizerSettingsService, private folderApiService: FolderApiService, private datePipe: DatePipe
    ) {
        this.isEditMode = false;
        this.folderData = {} as Folder;
        this.folderDataArray = [];
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



    onEditItem(element: Folder) {
      this.isEditMode = true;
      this.folderData = element;
    }

    // CRUD Actions

    onDeleteItem(element: Folder) {
      this.deleteFolder(element.id);
      console.log("area deleted");
      this.getAllFolders();
    }

    onCancelEdit() {
      this.resetEditState();
      this.toggleClass();
      this.getAllFolders();
    }

    onFolderAdded(element: Folder) {
      this.folderData.id = this.folderDataArray[this.folderDataArray.length-1].id+1;
      this.folderData = element;
      this.folderData.date = this.formatDate((new Date()).toISOString());
      this.folderData.routerLink = "folder-name/files";
      this.folderData.size = "7.5 GB";
      this.createFolder();
      this.resetEditState();
      this.getAllFolders();
      this.toggleClass();
    }

    // UI Event Handlers

    ngOnInit(): void {
      this.getAllFolders();
    }

    private resetEditState(): void {
      this.isEditMode = false;
      this.folderData = {} as Folder;
    }

    private getAllFolders() {
      this.folderApiService.getAll().subscribe((response: any) => {
        this.folderDataArray = response;
        console.log(this.folderDataArray);
      });
    };

    private createFolder() {
      this.folderApiService.create(this.folderData).subscribe((response: any) => {
        this.folderDataArray.push({...response});
        this.folderDataArray = this.folderDataArray.map((folder: Folder) => {
          return folder;
        });
      });
    };

    // Lifecycle Hooks

    private deleteFolder(folderId: number) {
      this.folderApiService.delete(folderId).subscribe(() => {
        this.folderDataArray = this.folderDataArray.filter((folder: Folder) => {
          return folder.id !== folderId ? folder : false;
        });
      });
    };

}
