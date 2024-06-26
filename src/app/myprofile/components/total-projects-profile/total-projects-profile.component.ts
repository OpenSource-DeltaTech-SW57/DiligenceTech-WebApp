import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {ProjectsApiService} from "../../../project-management/services/projects-api.service";

@Component({
  selector: 'app-total-projects-profile',
  templateUrl: './total-projects-profile.component.html',
  styleUrl: './total-projects-profile.component.scss'
})
export class TotalProjectsProfileComponent implements OnInit {
  isToggled = false;
  totalProjects: number = 0;

  constructor(
      public themeService: CustomizerSettingsService,
      private projectsApiService: ProjectsApiService
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
      this.totalProjects = response.totalProjects;
    });
  }

}
