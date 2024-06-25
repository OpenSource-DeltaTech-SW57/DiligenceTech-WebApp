import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/services/base.service";
import { Project } from "../model/project.entity";
import {
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  retry,
} from "rxjs";
import { AuthUsers } from "../../authentication/model/auth-users.entity";
import { CreateProject } from "../model/create-project";

@Injectable({
  providedIn: "root",
})
export class ProjectsApiService extends BaseService<CreateProject> {
  constructor(http: HttpClient) {
    super(http);
    // this.resourceEndpoint = "/due-diligence-projects";
    this.resourceEndpoint = "/agents";
  }

  getAllProjectsLinkedAgent(agentRecordId: string) {
    return this.http.get<Project>(
      `${this.resourcePath()}/${agentRecordId}/due-diligence-projects/all`,
      this.httpOptions,
    )
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllProjectsSellSide(agentRecordId: string) {
    return this.http.get<Project>(
      `${this.resourcePath()}/${agentRecordId}/due-diligence-projects/all-sellside`,
      this.httpOptions,
    ).pipe(retry(2), catchError(this.handleError));
  }

  getAllProjectsBuySide(agentRecordId: string) {
    return this.http.get<Project>(
      `${this.resourcePath()}/${agentRecordId}/due-diligence-projects/all-buyside`,
      this.httpOptions,
    )
      .pipe(retry(2), catchError(this.handleError));
  }

  getByUser(user: string) {
    return this.http.get<Project[]>(`${this.basePath}${this.resourceEndpoint}`)
      .pipe(
        map((projects) => {
          // Filter projects where the 'agents' array contains the specified user
          // return projects.filter(project => project.buyAgents && project.sellAgents && (project.sellAgents.includes(user) || project.buyAgents.includes(user)));
          return null;
        }),
      );
  }

  getProjectIfSellRole(project: string, user: string) {
    return this.http.get<Project[]>(
      `${this.basePath}${this.resourceEndpoint}?id=${project}`,
    )
      .pipe(
        map((projects) => {
          // return projects.filter(project => project.sellAgents && project.sellAgents.includes(user));
          return null;
        }),
      );
  }
}
