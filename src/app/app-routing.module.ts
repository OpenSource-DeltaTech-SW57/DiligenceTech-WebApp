import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { AboutComponent } from './public/pages/about/about.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { UserManagementComponent } from './testing/pages/user-management/user-management.component';
import { ProjectListComponent } from './project-management/pages/project-list/project-list.component';
import { ProjectCreateAndEditComponent } from './project-management/components/project-create-and-edit/project-create-and-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { InboxComponent } from './email/components/inbox/inbox.component';
import { ComposeComponent } from './email/components/compose/compose.component';
import { ReadComponent } from './email/components/read/read.component';
import { NotificationListComponent } from './notifications/pages/notification-list/notification-list.component';
import { MyprofileComponent } from './myprofile/pages/myprofile/myprofile.component';
import { AccountSettingsComponent } from './settings/components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './settings/components/change-password/change-password.component';
import { ConnectionsComponent } from './settings/components/connections/connections.component';
import { PrivacyPolicyComponent } from './settings/components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './settings/components/terms-conditions/terms-conditions.component';
import { SettingsAccountComponent } from './settings/pages/settings-account/settings-account.component';

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "about", component: AboutComponent},
  {path: "testing/users", component: UserManagementComponent},
  {path: "project-management/all-projects", component: ProjectListComponent},
  {path: "project-management/create-project", component: ProjectCreateAndEditComponent},
  {path: "communications/email/inbox", component: InboxComponent},
  {path: "communications/email/compose", component: ComposeComponent},
  {path: "communications/email/read", component: ReadComponent},
  {path: "communications/notifications", component: NotificationListComponent},
  {path: "account/my-profile", component: MyprofileComponent},
  {path: "account/settings", component: SettingsAccountComponent, children: [
    {path: "", component: AccountSettingsComponent},
    {path: "change-password", component: ChangePasswordComponent},
    {path: "connections", component: ConnectionsComponent},
    {path: "privacy-policy", component: PrivacyPolicyComponent},
    {path: "terms-conditions", component: TermsConditionsComponent},
  ]},
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
