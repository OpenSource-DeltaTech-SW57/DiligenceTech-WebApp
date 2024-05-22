export class Area{
  id: number;
  title: string;
  owner: string;
  date: string;
  filesCount: number;
  size: string;
  routerLink: string;
  action: {[key: string]: string};
  constructor(){
  this.id = 0;
  this.title = "";
  this.owner = "";
  this.date = "";
  this.filesCount = 0;
  this.size = "";
  this.routerLink = "";
  this.action = {};
  }
}
