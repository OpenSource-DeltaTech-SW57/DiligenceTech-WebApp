import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Folder } from '../model/folder.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService extends BaseService<Folder> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/folders"
  }
}
