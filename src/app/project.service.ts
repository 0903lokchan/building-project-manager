import { Injectable } from '@angular/core';
import { Project } from "./data_model/project";
import { PROJECTS } from "./mock_data/mock_project";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProject(id: number): Observable<Project> {
    const project = of(PROJECTS[id]);
    return project;
  }
}
