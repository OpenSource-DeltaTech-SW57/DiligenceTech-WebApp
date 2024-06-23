import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import {Notifications} from "../model/notifications.entity";

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService extends BaseService<Notifications> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/notifications"
   }
}
