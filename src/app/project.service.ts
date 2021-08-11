import { Injectable } from '@angular/core';
import { Project } from "./data_model/project";
import { PROJECTS } from "./mock_data/mock_project";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProject(id: string): Observable<Project> {
    const project = PROJECTS.filter(project => project.id == id)[0]
    return of(project);
  }

  updateProject(project: Project): Observable<boolean> {
    // TODO make HTTP request
    return of(false);
  }
}
