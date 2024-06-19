export class Project {
  id: number;
  projectName: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  projectManager: string;
  projectTags: Array<string>;
  previewImage: any;
  attachedFiles: Array<any>;
  budget: number;
  teamMembers: Array<string>;
  progress: number;
  status: any;
  action: any;
  sellAgents: Array<string>;
  buyAgents: Array<string>;
  constructor(){
    this.id = 0;
    this.projectName = "";
    this.startDate = "";
    this.endDate = "";
    this.projectDescription = "";
    this.projectManager = "";
    this.projectTags = [];
    this.attachedFiles = [];
    this.budget = 0;
    this.teamMembers = [];
    this.progress = 0;
    this.status = {};
    this.action = {};
    this.sellAgents = [];
    this.buyAgents = [];
  }
}
