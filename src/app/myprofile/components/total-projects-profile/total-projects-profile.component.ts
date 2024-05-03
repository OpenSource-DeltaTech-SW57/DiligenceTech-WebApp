import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-total-projects-profile',
  templateUrl: './total-projects-profile.component.html',
  styleUrl: './total-projects-profile.component.scss'
})
export class TotalProjectsProfileComponent {
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // Dark Mode
  toggleTheme() {
      this.themeService.toggleTheme();
  }

}
