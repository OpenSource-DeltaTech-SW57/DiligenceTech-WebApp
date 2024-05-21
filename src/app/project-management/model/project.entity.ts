export class Project {
  id: number;
  projectName: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  projectCategory: string;
  projectManager: string;
  projectTags: {[key:string]: string};
  previewImage: any;
  attachedFiles: Array<any>;
  budget: number;
  teamMembers: {[key:string]: string};
  progress: number;
  status: {[key:string]: string};
  action: {[key:string]: string};
  constructor(){
    this.id = 0;
    this.projectName = "";
    this.startDate = "";
    this.endDate = "";
    this.projectDescription = "";
    this.projectCategory = "";
    this.projectManager = "";
    this.projectTags = {};
    this.attachedFiles = [];
    this.budget = 0;
    this.teamMembers = {};
    this.progress = 0;
    this.status = {};
    this.action = {};
  }
}
