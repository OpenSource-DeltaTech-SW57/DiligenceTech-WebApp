import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Project } from '../model/project.entity';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService extends BaseService<Project>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/projects";
  }
}
