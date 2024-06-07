import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UsersService } from './testing/services/users.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from "@angular/material/checkbox"

import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from "@angular/material/menu";
import { MatSelectModule } from '@angular/material/select';
import {FileUploadModule} from "@iplab/ngx-file-upload";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgClass, CommonModule, Location, LocationStrategy, PathLocationStrategy, DatePipe } from '@angular/common';
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
import { SidebarEmailComponent } from './email/components/sidebar-email/sidebar-email.component';
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
import { EmailComponent } from './email/email.component';
import { ComposeComponent } from './email/components/compose/compose.component';
import { InboxComponent } from './email/components/inbox/inbox.component';
import { ReadComponent } from './email/components/read/read.component';
import { DraftsComponent } from './email/components/drafts/drafts.component';
import { NotificationListComponent } from './notifications/pages/notification-list/notification-list.component';
import { WelcomeBannerComponent } from './myprofile/components/welcome-banner/welcome-banner.component';
import { GeneralProfileComponent } from './myprofile/components/general-profile/general-profile.component';
import { ProfileInformationComponent } from './myprofile/components/profile-information/profile-information.component';
import { TotalProjectsProfileComponent } from './myprofile/components/total-projects-profile/total-projects-profile.component';
import { MyprofileComponent } from './myprofile/pages/myprofile/myprofile.component';
import { AccountSettingsComponent } from './settings/components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './settings/components/change-password/change-password.component';
import { ConnectionsComponent } from './settings/components/connections/connections.component';
import { PrivacyPolicyComponent } from './settings/components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './settings/components/terms-conditions/terms-conditions.component';
import { SettingsAccountComponent } from './settings/pages/settings-account/settings-account.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LockScreenComponent } from './authentication/components/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/components/logout/logout.component';
import { SignInComponent } from './authentication/components/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { RootAuthenticationComponent } from './authentication/pages/root-authentication/root-authentication.component';
import { SubscriptionPlanComponent } from './public/pages/subscription-plan/subscription-plan.component';
import { SidebarFileManagementComponent } from './file-management/components/sidebar-file-management/sidebar-file-management.component';
import { DashboardFileManagementComponent } from './file-management/pages/dashboard-file-management/dashboard-file-management.component';
import { SharedDriveComponent } from './file-management/components/shared-drive/shared-drive.component';
import { FolderComponent } from './file-management/components/folder/folder.component';
import { FileComponent } from './file-management/components/file/file.component';
import { EncryptionDataService } from './shared/services/encryption-data.service';
import { AuthService } from './authentication/services/auth.service';
import { AuthGuardService } from './authentication/guards/auth.guard.service';
import { SentComponent } from './email/components/sent/sent.component';
import { SpamComponent } from './email/components/spam/spam.component';
import { TrashComponent } from './email/components/trash/trash.component';
import { ImportantComponent } from './email/components/important/important.component';
import { AllQuestionsComponent } from './q-and-a/pages/all-questions/all-questions.component';
import { QuestionsProjectListComponent } from './q-and-a/pages/questions-project-list/questions-project-list.component';
import { QAndAComponent } from './q-and-a/pages/q-and-a/q-and-a.component';


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
    EmailComponent,
    ComposeComponent,
    InboxComponent,
    ReadComponent,
    SidebarEmailComponent,
    NotificationListComponent,
    WelcomeBannerComponent,
    GeneralProfileComponent,
    ProfileInformationComponent,
    TotalProjectsProfileComponent,
    MyprofileComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    ConnectionsComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    SettingsAccountComponent,
    ForgotPasswordComponent,
    LockScreenComponent,
    LogoutComponent,
    SignInComponent,
    SignUpComponent,
    RootAuthenticationComponent,
    SubscriptionPlanComponent,
    SidebarFileManagementComponent,
    DashboardFileManagementComponent,
    SharedDriveComponent,
    FolderComponent,
    FileComponent,
    DraftsComponent,
    SentComponent,
    SpamComponent,
    TrashComponent,
    ImportantComponent,
    AllQuestionsComponent,
    QuestionsProjectListComponent,
    QAndAComponent
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
    NgApexchartsModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  providers: [
    provideAnimationsAsync(), UsersService, ProjectsApiService, CustomizerSettingsService, ToggleService, DatePipe, EncryptionDataService, AuthService, AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
