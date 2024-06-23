import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Document} from "../model/document.entity";
import {HttpClient} from "@angular/common/http";
import {Area} from "../model/area.entity";

@Injectable({
  providedIn: 'root'
})
export class DocumentsApiService extends BaseService<Document> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/documents";
  }

  getByFolder(folder: string) {
    return this.http.get<Area>(`${this.basePath}${this.resourceEndpoint}?folder_id=${folder}`).pipe();
  }
}
