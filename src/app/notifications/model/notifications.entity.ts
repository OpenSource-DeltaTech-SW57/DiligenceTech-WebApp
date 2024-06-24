export class Notifications {
    id: number;
    agent_id: number;
    created_at: string;
    type: string;
    content: string;

    constructor(){
        this.id = 0;
        this.agent_id = 0;
        this.created_at = '';
        this.type = '';
        this.content = '';
    }


}
