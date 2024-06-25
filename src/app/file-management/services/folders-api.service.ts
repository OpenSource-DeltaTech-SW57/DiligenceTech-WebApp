import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Folder} from "../model/folder.entity";
import {HttpClient} from "@angular/common/http";
import {Area} from "../model/area.entity";

@Injectable({
  providedIn: 'root'
})
export class FoldersApiService extends BaseService<Folder> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/folders";
  }

  getByArea(area: string) {
    return this.http.get<Area>(`${this.basePath}${this.resourceEndpoint}/${area}`).pipe();
  }
}
