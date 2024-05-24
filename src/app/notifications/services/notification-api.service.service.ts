import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Project } from '../../project-management/model/project.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationApiServiceService extends BaseService<Project> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/notifications"
   }
}
