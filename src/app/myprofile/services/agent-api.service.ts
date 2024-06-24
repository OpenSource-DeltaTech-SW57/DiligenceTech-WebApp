import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class AgentApiService extends BaseService<>{

   constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/notifications";
  }
  getAgentByCode(agentCode: string){
    console.log(`${this.basePath}${this.httpOptions}?`)

  }


}

