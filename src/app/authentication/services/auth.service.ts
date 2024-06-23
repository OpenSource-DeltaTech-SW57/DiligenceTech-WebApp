import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUsers } from '../model/auth-users.entity';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath: string = `${environment.serverBasePath}/users`;
  public user!: AuthUsers;
  constructor(private http: HttpClient) {}

  get currentUser(): AuthUsers|undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login( email: string, password: string ):Observable<AuthUsers> {
    return this.http.get<AuthUsers>(`${this.basePath}?email=${email}&password=${password}`).pipe();
  }

  //checkAuthentication(email: string, password: string): Observable<boolean> {

  //  if ( !localStorage.getItem('token') ) return of(false);

  //  const token = localStorage.getItem('token');

  //  return this.http.get<AuthUsers>(`${this.basePath}?email=${email}&password=${password}`)
  //    .pipe(
  //      tap( user => this.user = user ),
  //      map( user => !!user ),
  //      catchError( (error:any) => of(false) )
  //    );
  //}
  checkAuthentication(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) return of(false);
    return of(true);
  }

  logout() {
    this.user = {} as AuthUsers;
    localStorage.removeItem("token");
  }
}





