import { Injectable } from '@angular/core';
import { Project } from "./data_model/project";
import { PROJECTS } from "./mock_data/mock_project";
import { Observable, of } from "rxjs";
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  getProjects(): Project[] {
    const storedProjects = localStorage.getItem('projects')
    const projects: Project[] = storedProjects ? JSON.parse(storedProjects) : PROJECTS
    return projects;
  }

  getProject(id: string): Observable<Project> {
    return of(this.getProjects().filter(project => project.id == id)[0])
  }

  updateProject(project: Project): Observable<boolean> {
    try {
      // TODO make HTTP request
      const projects = this.getProjects()
      const id = projects.findIndex(proj => proj.id == project.id)
      if (id == -1) {
        projects.push(project);
      } else {
        projects[id] = project;
      }
      localStorage.setItem('projects', JSON.stringify(projects))
      return of(true);
    } catch (e) {
      return of(false)
    }
  }
}
