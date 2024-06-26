import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../../../project-management/services/projects-api.service";

@Component({
  selector: 'app-total-members',
  templateUrl: './total-members.component.html',
  styleUrl: './total-members.component.scss'
})
export class TotalMembersComponent implements OnInit {
    isToggled = false;
    totalMembers: number = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectsApiService: ProjectsApiService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

  ngOnInit(): void {
    this.projectsApiService.getDashboardContentOfAgent(String(localStorage.getItem('user'))).subscribe((response: any) => {
      this.totalMembers = response.totalAgents;
    });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
