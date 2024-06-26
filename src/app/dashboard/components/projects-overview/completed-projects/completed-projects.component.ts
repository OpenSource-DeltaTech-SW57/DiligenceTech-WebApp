import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../../../project-management/services/projects-api.service";

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrl: './completed-projects.component.scss'
})
export class CompletedProjectsComponent implements OnInit {
    isToggled = false;
    completedProjects: number = 0;

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
      this.completedProjects = response.completedProjects;
    });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

}
