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
import { SignInComponent } from './authentication/components/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/components/forgot-password/forgot-password.component';
import { LockScreenComponent } from './authentication/components/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/components/logout/logout.component';
import { RootAuthenticationComponent } from './authentication/pages/root-authentication/root-authentication.component';
import { SubscriptionPlanComponent } from './public/pages/subscription-plan/subscription-plan.component';
import { DashboardFileManagementComponent } from './file-management/pages/dashboard-file-management/dashboard-file-management.component';
import { SharedDriveComponent } from './file-management/components/shared-drive/shared-drive.component';
import { FolderComponent } from './file-management/components/folder/folder.component';
import { FileComponent } from './file-management/components/file/file.component';

const routes: Routes = [
  {path: "authentication", component: RootAuthenticationComponent, children: [
    {path: "", component: SignInComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "lock-screen", component: LockScreenComponent},
    {path: "logout", component: LogoutComponent},
  ]},
  {path: "dashboard", component: DashboardComponent},
  {path: "about", component: AboutComponent},
  {path: "testing/users", component: UserManagementComponent},
  {path: "project-management/all-projects", component: ProjectListComponent},
  {path: "project-management/create-project", component: ProjectCreateAndEditComponent},
  {path: "communications/email/inbox", component: InboxComponent},
  {path: "communications/email/compose", component: ComposeComponent},
  {path: "communications/email/read", component: ReadComponent},
  {path: "communications/notifications", component: NotificationListComponent},
  {path: "pricing/subscription-plan", component: SubscriptionPlanComponent},
  {path: "account/my-profile", component: MyprofileComponent},
  {path: "account/settings", component: SettingsAccountComponent, children: [
    {path: "", component: AccountSettingsComponent},
    {path: "change-password", component: ChangePasswordComponent},
    {path: "connections", component: ConnectionsComponent},
    {path: "privacy-policy", component: PrivacyPolicyComponent},
    {path: "terms-conditions", component: TermsConditionsComponent},
  ]},
  {path: "project-management/all-projects/id/file-management", component: DashboardFileManagementComponent, children: [
    {path: "", component: SharedDriveComponent},
    {path: "legal", component: FolderComponent},
    {path: "legal/folder-name/files", component: FileComponent},
    {path: "financial", component: FolderComponent},
    {path: "financial/folder-name/files", component: FileComponent},
    {path: "tax", component: FolderComponent},
    {path: "tax/folder-name/files", component: FileComponent},
    {path: "operational", component: FolderComponent},
    {path: "operational/folder-name/files", component: FileComponent},
  ]},
  {path: "", redirectTo: "authentication", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
