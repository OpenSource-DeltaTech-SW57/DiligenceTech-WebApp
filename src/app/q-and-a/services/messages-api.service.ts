import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Message} from "../model/message.entity";
import {HttpClient} from "@angular/common/http";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService extends BaseService<Message> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/messages";
  }

  getQuestions() {
    return this.http.get<Message>(`${this.resourcePath()}?answering_id=-1`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }
}
