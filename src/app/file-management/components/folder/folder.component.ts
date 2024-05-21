import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent {
    // isToggled
    isToggled = false;

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

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
