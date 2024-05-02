import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersService } from './testing/services/users.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from "@angular/material/expansion";

import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from "@angular/material/menu";
import { MatSelectModule } from '@angular/material/select';
import {FileUploadModule} from "@iplab/ngx-file-upload";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgClass, CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {NgxEditorModule, Editor, Toolbar} from "ngx-editor";
import {NgApexchartsModule} from "ng-apexcharts";

import { HomeComponent } from './public/pages/home/home.component';
import { AboutComponent } from './public/pages/about/about.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { UserCreateAndEditComponent } from './testing/components/user-create-and-edit/user-create-and-edit.component';
import { UserManagementComponent } from './testing/pages/user-management/user-management.component';
import { ProjectCreateAndEditComponent } from './project-management/components/project-create-and-edit/project-create-and-edit.component';
import { ProjectsApiService } from './project-management/services/projects-api.service';
import { CustomizerSettingsComponent } from './shared/components/customizer-settings/customizer-settings.component';
import { ProjectListComponent } from './project-management/pages/project-list/project-list.component';
import { DpStartDateComponent } from './shared/components/datepicker/dp-start-date/dp-start-date.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CustomizerSettingsService } from './shared/services/customizer-settings.service';
import { ToggleService } from './shared/services/toggle.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProjectsOverviewComponent } from './dashboard/components/projects-overview/projects-overview.component';
import { ActiveProjectsComponent } from './dashboard/components/projects-overview/active-projects/active-projects.component';
import { CompletedProjectsComponent } from './dashboard/components/projects-overview/completed-projects/completed-projects.component';
import { TotalMembersComponent } from './dashboard/components/projects-overview/total-members/total-members.component';
import { TotalProjectsComponent } from './dashboard/components/projects-overview/total-projects/total-projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsRoadmapComponent } from './dashboard/components/projects-roadmap/projects-roadmap.component';
import { ActiveProjectComponent } from './dashboard/components/active-project/active-project.component';
import { ProjectsProgressComponent } from './dashboard/components/projects-progress/projects-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    UserCreateAndEditComponent,
    UserManagementComponent,
    ProjectCreateAndEditComponent,
    CustomizerSettingsComponent,
    ProjectListComponent,
    DpStartDateComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    ProjectsOverviewComponent,
    ActiveProjectsComponent,
    CompletedProjectsComponent,
    TotalMembersComponent,
    TotalProjectsComponent,
    DashboardComponent,
    ProjectsRoadmapComponent,
    ActiveProjectComponent,
    ProjectsProgressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    FileUploadModule,
    MatDividerModule,
    NgScrollbarModule,
    NgClass,
    NgxEditorModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatExpansionModule,
    CommonModule,
    NgApexchartsModule
  ],
  providers: [
    provideAnimationsAsync(), UsersService, ProjectsApiService, CustomizerSettingsService, ToggleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
