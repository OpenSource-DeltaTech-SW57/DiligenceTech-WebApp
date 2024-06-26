import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {BaseService} from "../../shared/services/base.service";
import {Agent} from "../model/agent.entity";
import { AgentEntity } from '../../file-management/model/agent.entity';

@Injectable({
  providedIn: 'root'
})
export class AgentApiService extends BaseService<Agent>{

   constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/agents";
  }

  getAgentByCode(agentCode: string){

     agentCode = agentCode.replace('@','%40');
     console.log(agentCode)
     return  this.http.get<Agent>(`${this.basePath}${this.resourceEndpoint}/email/${agentCode}`).pipe();
  }

  getAgentDataByUsernameAndProjectId(agentRecordId: string, projectId: number) {
// http://localhost:8082/api/v1/agents/u20201b380/due-diligence-projects/{projectId}?projectId=1
    return this.http.get<AgentEntity>(`${this.resourcePath()}/${agentRecordId}/due-diligence-projects/{projectId}?projectId=${projectId}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }


}

