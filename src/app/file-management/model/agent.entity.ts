export class AgentEntity {
  projectMemberItemId: number;
  projectId: number;
  agentId: string;
  agentRole: string;
  constructor(projectMemberItemId: number, projectId: number, agentId: string, agentRole: string){
    this.projectMemberItemId = projectMemberItemId;
    this.projectId = projectId;
    this.agentId = agentId;
    this.agentRole = agentRole;
  }
}
