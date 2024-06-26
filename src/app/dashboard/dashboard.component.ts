import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProjectsApiService} from "../project-management/services/projects-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dashboardContent: any;

  constructor(
    private projectsApiService: ProjectsApiService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.projectsApiService.getDashboardContentOfAgent(String(localStorage.getItem('user'))).subscribe((response: any) => {
      this.dashboardContent = response;
    });
  }

}
