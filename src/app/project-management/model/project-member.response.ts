export class ProjectMemberResponse {
  projectMemberItemId: number;
  projectId: number;
  agentId: string;
  agentRole: string;

  constructor() {
    this.projectMemberItemId = 0;
    this.projectId = 0;
    this.agentId = '';
    this.agentRole = '';
  }
}
