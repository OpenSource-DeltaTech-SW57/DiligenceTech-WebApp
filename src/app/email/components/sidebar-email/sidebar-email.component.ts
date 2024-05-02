import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-sidebar-email',
  templateUrl: './sidebar-email.component.html',
  styleUrl: './sidebar-email.component.scss',
})
export class SidebarEmailComponent {
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
