import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-active-project',
  templateUrl: './active-project.component.html',
  styleUrl: './active-project.component.scss'
})
export class ActiveProjectComponent {
  isToggled = false;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }
}
