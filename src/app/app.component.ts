import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { ToggleService } from './shared/services/toggle.service';
import { CustomizerSettingsService } from './shared/services/customizer-settings.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diligencetech-webapp';
  routerSubscription: any;
  location: any;

  // isSidebarToggled
  isSidebarToggled = false;

  // isToggled
  isToggled = false;

  constructor(
      public router: Router,
      private toggleService: ToggleService,
      public themeService: CustomizerSettingsService
  ) {
      this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
          this.isSidebarToggled = isSidebarToggled;
      });
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // ngOnInit
  ngOnInit(){
      if (!localStorage.getItem('isDarkTheme')) {
           localStorage.setItem('isDarkTheme', JSON.stringify(true));
      }
      this.recallJsFuntions();
  }

  // recallJsFuntions
  recallJsFuntions() {
      this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
          this.location = this.router.url;
          if (!(event instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0);
      });
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

  // Card Border Radius
  toggleCardBorderRadiusTheme() {
      this.themeService.toggleCardBorderRadiusTheme();
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}
