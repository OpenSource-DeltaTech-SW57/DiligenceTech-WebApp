import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Users } from '../model/users.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<Users>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "/users";
  }
}
