import {Component, HostListener, OnInit} from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { CustomizerSettingsService } from '../../services/customizer-settings.service';
import {AgentApiService} from "../../../myprofile/services/agent-api.service";
import { AuthService } from '../../../authentication/services/auth.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  // isSidebarToggled
  isSidebarToggled = false;

  // isToggled
  isToggled = false;

  // username
  username = '';

  constructor(
      private toggleService: ToggleService,
      public themeService: CustomizerSettingsService,
      private agentApiService: AgentApiService,
      private authService: AuthenticationService
  ) {
      this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
          this.isSidebarToggled = isSidebarToggled;
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  ngOnInit(): void {
        this.agentApiService.getAgentByCode(String(localStorage.getItem('user'))).subscribe((response:any)=>{
          this.username = response.fullName;
          console.log("hola")
          console.log(response.fullName);
        });
    }

  // Burger Menu Toggle
  toggle() {
      this.toggleService.toggle();
  }

  // Header Sticky
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollPosition >= 50) {
          this.isSticky = true;
      } else {
          this.isSticky = false;
      }
  }

  // Dark Mode
  toggleTheme() {
      this.themeService.toggleTheme();
  }

  // Sidebar Dark
  toggleSidebarTheme() {
      this.themeService.toggleSidebarTheme();
  }

  // Right Sidebar
  toggleRightSidebarTheme() {
      this.themeService.toggleRightSidebarTheme();
  }

  // Hide Sidebar
  toggleHideSidebarTheme() {
      this.themeService.toggleHideSidebarTheme();
  }

  // Header Dark Mode
  toggleHeaderTheme() {
      this.themeService.toggleHeaderTheme();
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
