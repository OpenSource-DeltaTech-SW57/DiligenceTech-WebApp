export class CreateProject {
  projectName: string;
  sellAgents: Array<string>;
  buyAgents: Array<string>;

  constructor(projectName: string, sellAgents: Array<string>, buyAgents: Array<string>) {
    this.projectName = projectName;
    this.sellAgents = sellAgents;
    this.buyAgents = buyAgents;
  }
}
