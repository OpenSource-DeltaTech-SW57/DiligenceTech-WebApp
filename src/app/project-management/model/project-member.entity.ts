export class ProjectMember {
  projectId: number;
  agentId: string;
  agentRole: string;

  constructor(projectId: number, agentId: string, agentRole: string) {
    this.projectId = projectId;
    this.agentId = agentId;
    this.agentRole = agentRole;
  }
}
