import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { File } from '../model/file.entity';

@Injectable({
  providedIn: 'root'
})
export class FilesApiService extends BaseService<File> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/files"
  }
}
