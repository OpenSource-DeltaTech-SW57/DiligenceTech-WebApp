export class ProjectMemberResourceEntity {

  projectId: number;
  agentCode: string;
  agentRole: string;

  constructor(projectId: number, agentCode: string,agentRole: string) {
    this.projectId = projectId;
    this.agentCode = agentCode;
    this.agentRole = agentRole;
  }
}
