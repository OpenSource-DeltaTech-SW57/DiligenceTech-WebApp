import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../../../project-management/services/projects-api.service";

@Component({
  selector: 'app-active-projects',
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent implements OnInit {
    isToggled = false;
    activeProjects: number = 0;

    constructor(
        public themeService: CustomizerSettingsService,
        private projectsApiService: ProjectsApiService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

  ngOnInit(): void {
    this.projectsApiService.getDashboardContentOfAgent(String(localStorage.getItem('user'))).subscribe((response: any) => {
      this.activeProjects = response.activeProjects;
    });
  }
}
