import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-active-projects',
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent {
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
