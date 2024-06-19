import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { AboutComponent } from './public/pages/about/about.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { UserManagementComponent } from './testing/pages/user-management/user-management.component';
import { ProjectListComponent } from './project-management/pages/project-list/project-list.component';
import { ProjectCreateAndEditComponent } from './project-management/components/project-create-and-edit/project-create-and-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportantComponent } from './email/components/important/important.component';
import { EmailComponent } from './email/email.component';
import { DraftsComponent } from './email/components/drafts/drafts.component';
import { TrashComponent } from './email/components/trash/trash.component';
import { SpamComponent } from './email/components/spam/spam.component';
import { InboxComponent } from './email/components/inbox/inbox.component';
import { ComposeComponent } from './email/components/compose/compose.component';
import { SentComponent } from './email/components/sent/sent.component';
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
import { AuthGuardService } from './authentication/guards/auth.guard.service';
import {AllQuestionsComponent} from "./q-and-a/pages/all-questions/all-questions.component";
import {QAndAComponent} from "./q-and-a/pages/q-and-a/q-and-a.component";
import {QuestionsProjectListComponent} from "./q-and-a/pages/questions-project-list/questions-project-list.component";
import {
  RootProjectManagementComponent
} from "./project-management/components/root-project-management/root-project-management.component";
import {RootEmailComponent} from "./email/pages/root-email/root-email.component";
import {FoldersListComponent} from "./file-management/components/folders-list/folders-list.component";


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
  {path: "project-management", component: RootProjectManagementComponent, children: [
      {path: "all-projects", component: ProjectListComponent},
      {path: "create-project", component: ProjectCreateAndEditComponent},
    ]},
  {path: "communications/email", component: RootEmailComponent, children: [
      {path: "inbox", component: InboxComponent},
      {path: "important", component: ImportantComponent},
      {path: "compose", component: ComposeComponent },
      {path: "trash", component: TrashComponent },
      {path: "drafts", component: DraftsComponent },
      {path: "read", component: ReadComponent},
      {path: "notifications", component: NotificationListComponent},
      {path: "sent", component: SentComponent},
      {path: "spam", component: SpamComponent},
    ]},
  {path: "pricing/subscription-plan", component: SubscriptionPlanComponent},
  {path: "account/my-profile", component: MyprofileComponent },
  {path: "account/settings", component: SettingsAccountComponent , children: [
    {path: "", component: AccountSettingsComponent},
    {path: "change-password", component: ChangePasswordComponent},
    {path: "connections", component: ConnectionsComponent},
    {path: "privacy-policy", component: PrivacyPolicyComponent},
    {path: "terms-conditions", component: TermsConditionsComponent},
  ]},
  {path: "project-management/all-projects/:id/file-management", component: DashboardFileManagementComponent, children: [
    {path: "", component: SharedDriveComponent},
      {path: ":areaId", component: FoldersListComponent}
  ]},
  {path: "q-and-a", component: QAndAComponent, children: [
      {path: "all-questions", component: AllQuestionsComponent },
      {path: "questions-project", component: QuestionsProjectListComponent },
    ]},
  {path: "", redirectTo: "authentication", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
