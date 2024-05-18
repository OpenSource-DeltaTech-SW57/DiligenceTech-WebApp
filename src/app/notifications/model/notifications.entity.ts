
export class Notifications {
    notificationID: number;
    timestamp: string;
    type: string;
    content: string;
    status: any;

    constructor(){
        this.notificationID = 0;
        this.timestamp = "";
        this.type = "";
        this.content = "";
        this.status = {};
    }

    
}
