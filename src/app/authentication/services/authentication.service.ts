import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {SignUpRequest} from "../model/sign-up.request";
import {SignUpResponse} from "../model/sign-up.response";
import {SignInRequest} from "../model/sign-in.request";
import {SignInResponse} from "../model/sign-in.response";
import { ProjectsApiService } from '../../project-management/services/projects-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient, private projectApiService: ProjectsApiService) {
      this.checkToken();
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInEmail.asObservable();
  }

  private checkToken() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      this.signedIn.next(true);
      this.signedInEmail.next(email);
    } else {
      this.signedIn.next(false);
      this.signedInEmail.next('');
      this.signedInUserId.next(0);
    }
  }

  /**
   * Sign Up
   * @summary
   * This method sends a POST request to the server to sign up the user.
   * @param signUpRequest - Sign Up Request containing the username and password
   */
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log(`Signed Up as ${response.username} with ID: ${response.id}`);
          this.router.navigate(['/']).then();
        },
        error: (error) => {
          console.error(`Error while signing up: ${error.message}`);
          this.router.navigate(['/authentication/sign-up']).then();
        }
      });
  }

  /**
   * Sign In
   * @summary
   * This method sends a POST request to the server to sign in the user.
   * @param signInRequest - Sign In Request containing the username and password
   */
  signIn(signInRequest: SignInRequest) {

    // let usernameAgent: string this.projectApiService.getAllProjectsLinkedAgent(signInRequest.email).subscribe((response:any) => {
    //   usernameAgent = response;
    // })
    //
    // console.log('Username by email: ' + usernameAgent)


    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUserId.next(response.id);
          this.signedInEmail.next(response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
          console.log(`Signed In as ${response.email} with token: ${response.token}`);
          this.router.navigate(['/dashboard']).then();
        },
        error: (error) => {
          this.signedIn.next(false);
          this.signedInUserId.next(0);
          this.signedInEmail.next('');
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          console.error(`Error while signing in: ${error.message}`);
          this.router.navigate(['/authentication/sign-up']).then();
        }
      });
  }

  /**
   * Sign Out
   * @summary
   * This method signs out the user by clearing the local storage and redirecting to the sign-in page.
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInEmail.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }


}
