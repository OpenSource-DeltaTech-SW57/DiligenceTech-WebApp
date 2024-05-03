import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.scss'
})
export class SubscriptionPlanComponent {
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
