export class CreateProject {
  // id: number;
  projectName: string;
  sellAgents: Array<string>;
  buyAgents: Array<string>;

  constructor(projectName: string, sellAgents: Array<string>, buyAgents: Array<string>) {
    // this.id = id;
    this.projectName = projectName;
    this.sellAgents = sellAgents;
    this.buyAgents = buyAgents;
  }
}
