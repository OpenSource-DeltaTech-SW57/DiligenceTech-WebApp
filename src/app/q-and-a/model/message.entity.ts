export class Message {
  id: number;
  relative_id: number;
  project_id: number;
  answering_id: number;
  agent_id: number;
  content: string;
  created_at: string;

  constructor() {
    this.id = 0;
    this.relative_id = 0;
    this.project_id = 0;
    this.answering_id = 0;
    this.agent_id = 0;
    this.content = "";
    this.created_at = "";
  }
}
