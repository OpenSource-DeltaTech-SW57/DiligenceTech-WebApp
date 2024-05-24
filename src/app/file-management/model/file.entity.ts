export class FileEntity {
  id: number;
  folderName: string;
  uploaderName: string;
  date: string;
  size: string;
  routerLink: string;
  constructor(){
    this.id = 0;
    this.folderName = "";
    this.uploaderName = "";
    this.date = "";
    this.size = "";
    this.routerLink = "";
  }
}
