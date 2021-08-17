import { Injectable } from '@angular/core';
import { Project } from './data_model/project';
import { PROJECTS } from './mock_data/mock_project';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

const USE_MOCK: boolean = true;
const STORAGE_KEY: string = "projects";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor() {}

  getProjects(): Project[] {
    // retrieve session storage
    const storedProjects = sessionStorage.getItem('projects');
    if (storedProjects) {
      return JSON.parse(storedProjects);
    }
    // use mock data
    if (USE_MOCK) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(PROJECTS))
      return PROJECTS;
    }
    // retrieve from API
    const projects = this.httpGetProjects()
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    return projects;
  }

  setProjects(projects: Project[]): void {
    if (USE_MOCK) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } else {
      // update session storage when request was successful
      if (this.httpSetProjects(projects)) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      }
    }
  }

  getProject(id: string): Observable<Project | null> {
    const project = this.getProjects().filter((project) => project.id == id);
    if (project.length == 1) {
      return of(project[0]);
    }
    return of(null);
  }

  updateProject(project: Project): Observable<boolean> {
    try {
      const projects = this.getProjects();
      const id = projects.findIndex((proj) => proj.id == project.id);
      if (id == -1) {
        // create project
        projects.push(project);
      } else {
        // update project
        projects[id] = project;
      }
      this.setProjects(projects)
      return of(true);
    } catch (e) {
      return of(false);
    }
  }

  httpGetProjects(): Project[] {
    // TODO make HTTP request
    return [];
  }

  httpSetProjects(projects: Project[]): boolean {
    // TODO make HTTP request
    try {
      return true;
    } catch (error) {
      return false;
    }
  }
}
