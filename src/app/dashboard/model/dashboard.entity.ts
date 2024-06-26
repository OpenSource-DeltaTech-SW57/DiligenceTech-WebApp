export class DashboardContent {
  /*
  "totalProjects": 1,
  "activeProjects": 1,
  "completedProjects": 0,
  "totalAgents": 2
   */
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalAgents: number;

  constructor() {
    this.totalProjects = 0;
    this.activeProjects = 0;
    this.completedProjects = 0;
    this.totalAgents = 0;
  }
}
