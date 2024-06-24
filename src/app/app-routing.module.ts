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
import {AllQuestionsComponent} from "./q-and-a/pages/all-questions/all-questions.component";
import {QAndAComponent} from "./q-and-a/pages/q-and-a/q-and-a.component";
import {QuestionsProjectListComponent} from "./q-and-a/pages/questions-project-list/questions-project-list.component";
import {
  RootProjectManagementComponent
} from "./project-management/components/root-project-management/root-project-management.component";
import {RootEmailComponent} from "./email/pages/root-email/root-email.component";
import {FoldersListComponent} from "./file-management/components/folders-list/folders-list.component";
import {DocumentsListComponent} from "./file-management/components/documents-list/documents-list.component";
import {RootCreateComponent} from "./project-management/pages/root-create/root-create.component";
import {AreaCreationComponent} from "./file-management/components/area-creation/area-creation.component";
import {FolderCreationComponent} from "./file-management/folder-creation/folder-creation.component";
import {authenticationGuard} from "./authentication/services/authentication.guard";
import {DocumentsCreationComponent} from "./file-management/components/documents-creation/documents-creation.component";


const routes: Routes = [
  {path: "authentication", component: RootAuthenticationComponent, children: [
    {path: "", component: SignInComponent},
    {path: "sign-up", component: SignUpComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "lock-screen", component: LockScreenComponent},
    {path: "logout", component: LogoutComponent},
  ]},
  {path: "dashboard", component: DashboardComponent, canActivate: [authenticationGuard]},
  {path: "about", component: AboutComponent, canActivate: [authenticationGuard]},
  {path: "testing/users", component: UserManagementComponent, canActivate: [authenticationGuard]},
  {path: "project-management", component: RootProjectManagementComponent, canActivate: [authenticationGuard], children: [
      {path: "all-projects", component: ProjectListComponent},
      {path: "create-project", component: ProjectCreateAndEditComponent},
    ]},
  {path: "create", component: RootCreateComponent, canActivate: [authenticationGuard], children: [
      {path: "project", component: ProjectCreateAndEditComponent},
      {path: "area/:id", component: AreaCreationComponent},
      {path: "folder/:id/:areaId", component: FolderCreationComponent},
      {path: "documents/:id/:areaId/:folderId", component: DocumentsCreationComponent}
  ]},
  {path: "communications/email", component: RootEmailComponent, canActivate: [authenticationGuard], children: [
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
  {path: "pricing/subscription-plan", component: SubscriptionPlanComponent, canActivate: [authenticationGuard]},
  {path: "account/my-profile", component: MyprofileComponent, canActivate: [authenticationGuard] },
  {path: "account/settings", component: SettingsAccountComponent, canActivate:[authenticationGuard], children: [
    {path: "", component: AccountSettingsComponent},
    {path: "change-password", component: ChangePasswordComponent},
    {path: "connections", component: ConnectionsComponent},
    {path: "privacy-policy", component: PrivacyPolicyComponent},
    {path: "terms-conditions", component: TermsConditionsComponent},
  ]},
  {path: "project-management/all-projects", component: DashboardFileManagementComponent, canActivate: [authenticationGuard], children: [
    {path: ":id/file-management", component: SharedDriveComponent},
      {path: ":id/file-management/:areaId", component: FoldersListComponent},
      {path: ":id/file-management/:areaId/:folderId", component: DocumentsListComponent}
  ]},
  {path: "q-and-a", component: QAndAComponent, canActivate:[authenticationGuard], children: [
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
