import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Email} from "../model/email.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailApiService extends BaseService<Email>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/emails"
  }

  getBySenderEmail(sender_email: string){
    sender_email = sender_email.replace('@','%40');
    return this.http.get<Email>(`${this.basePath}${this.resourceEndpoint}/sender/${sender_email}`).pipe();
  }
  getByReceiverEmail(receiver_email: string){
    receiver_email = receiver_email.replace('@','%40');
    return this.http.get<Email>(`${this.basePath}${this.resourceEndpoint}/receiver/${receiver_email}`).pipe();
  }
}
