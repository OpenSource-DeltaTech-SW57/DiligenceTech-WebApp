import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Area} from "../model/area.entity";
import {HttpClient} from "@angular/common/http";
import {Project} from "../../project-management/model/project.entity";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AreaApiService extends BaseService<Area> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/areas";
  }

  getByProject(project: string) {
    return this.http.get<Area>(`${this.basePath}${this.resourceEndpoint}?project_id=${project}`).pipe();
  }
}
