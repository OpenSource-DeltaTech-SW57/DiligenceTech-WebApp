import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { SidebarEmailComponent } from '../sidebar-email/sidebar-email.component';
import {EmailApiService} from "../../services/email-api.service";
import {ActivatedRoute, Routes} from "@angular/router";


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent implements OnInit{

    emailContent: any;
    isToggled = false;

    constructor(
      private route: ActivatedRoute,
        public themeService: CustomizerSettingsService,
        private emailApiService: EmailApiService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.emailApiService.getAt(params['email']).subscribe(
          (response:any) =>{
            console.log(localStorage.getItem('title'))
            localStorage.getItem('title')
            this.emailContent=response;
          }
        )
      });
    }



    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    getEmailsById(emailId: number){

        this.emailApiService.getAt(emailId).subscribe((response:any)=>{
          console.log(response)
          this.emailContent.data = response;
        });


    }


}
