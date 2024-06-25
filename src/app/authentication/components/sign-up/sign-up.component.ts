import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    isToggled = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private authenticationService: AuthenticationService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            firstname: ['', [Validators.required, Validators.maxLength(22)]],
            lastname: ['', [Validators.required, Validators.maxLength(22)]]
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
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
          const username = this.authForm.get("username")!.value;
          const firstname = this.authForm.get("firstname")!.value;
          const lastname = this.authForm.get("lastname")!.value;
          const signUpRequest = new SignUpRequest(username, email, password, firstname, lastname);

          this.authenticationService.signUp(signUpRequest);
            this.router.navigate(['/']);

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
