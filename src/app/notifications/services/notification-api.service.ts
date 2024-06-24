import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import {Notifications} from "../model/notifications.entity";
import {Observable} from "rxjs";
import {Users} from "../../testing/model/users.entity";

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService extends BaseService<Notifications> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/notifications";
   }

   getByAgentId(agent_id: number){
     console.log(`${this.basePath}${this.resourceEndpoint}?agentId=${agent_id}`);
    return this.http.get<Notifications>(`${this.basePath}${this.resourceEndpoint}?agentId=${agent_id}`).pipe();


   }
}
