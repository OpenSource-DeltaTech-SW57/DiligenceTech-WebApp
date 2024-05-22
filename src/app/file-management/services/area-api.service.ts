import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Area } from '../model/area.entity';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaApiService extends BaseService<Area>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/areas"
  }
}
