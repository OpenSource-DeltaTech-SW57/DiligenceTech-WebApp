export class Folder {
  id: number;
  folderName: string;
  owner: string;
  date: string;
  filesItems: number;
  size: string;
  routerLink: string;
  constructor(){
    this.id = 0;
    this.folderName = "";
    this.owner = "";
    this.date = "";
    this.filesItems = 0;
    this.size = "";
    this.routerLink = "";
  }
}
