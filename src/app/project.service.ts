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
    const storedProject = localStorage.getItem('project')
    const project: Project[] = storedProject? JSON.parse(storedProject) : PROJECTS
    return of(project!.filter(project => project.id == id)[0]);
  }

  updateProject(project: Project): Observable<boolean> {
    // TODO make HTTP request
    localStorage.setItem('project', JSON.stringify(project))
    return of(true);
  }
}
