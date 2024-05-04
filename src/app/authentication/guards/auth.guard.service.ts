import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanMatch, CanActivate{
  private router!: Router

  constructor(private authService: AuthService) { }

  private checkAuthStatus(){
    return this.authService.checkAuthentication().pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated) {
          this.router.navigate(["/authentication"])
        }
      })
    )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('Can Match');
    // console.log({ route, segments })
    //return this.checkAuthStatus();
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('Can Activate');
    // console.log({ route, state })
    //return this.checkAuthStatus();
    return true;
  }
}
