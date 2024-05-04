import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { AuthUsers } from '../../model/auth-users.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    isToggled = false;
    userData: AuthUsers;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        public themeService: CustomizerSettingsService
    ) {
        this.userData = new AuthUsers();
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    onLogin() {
      const email= this.authForm.get("email")!.value;
      const password= this.authForm.get("password")!.value;
      this.authService.login(email,password).subscribe(data => {
        if(data) {
          this.router.navigate(["/dashboard"]);
        }else{
          console.log("User not found");
        }
      });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
      if (this.authForm.valid) {
        const email = this.authForm.get("email")!.value;
        const password = this.authForm.get("password")!.value;
        this.authService.login(email, password).subscribe((data:any) => {
          this.userData = data[0];
          if(this.userData && this.userData.email == email && this.userData.password == password){
            console.log("user found");
            //localStorage.setItem('token', "active");
            this.router.navigate(["/dashboard"]);
          } else {
            console.log("user not found");
          }
        }, (error:any) => {
            console.error('Error during login:', error);
        });
      } else {
          console.log('Form is invalid. Please check the fields.');
      }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
