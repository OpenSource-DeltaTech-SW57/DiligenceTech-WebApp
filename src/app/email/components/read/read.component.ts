import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { SidebarEmailComponent } from '../sidebar-email/sidebar-email.component';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent {
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

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}
