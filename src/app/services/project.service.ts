import { Injectable } from '@angular/core';
import { Project, ProjectStatus } from '../data_model/project';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

  private projectsApi = 'https://happybuildings.sim.vuw.ac.nz/api/dongpham';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Get a project by project ID
   * @param id project ID
   * @returns An Observable of the target Project. Returns an empty Project on error
   */
  getProject(id: string): Observable<Project> {
    const url = `${this.projectsApi}/project.${id}.json`;
    return this.http.get<Project>(url).pipe(
      tap((_) => this.log(`fetched project id=${id}`)),
      catchError(this.handleError<Project>(`httpGetProject id=${id}`))
    );
  }

  /**
   * Get a list of all projects.
   * @returns An Observable of project list
   */
  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.projectsApi)
      .pipe(
        catchError(this.handleError<Project[]>('httpGetProjects', []))
        );
  }

  /**
   * Get a list of all projects by making GET calls with incremental id until 500 error
   */
  getProjectsSync(): Observable<Project[]> {

    var startID: number = 0;
    const projects: Project[] = []
    while (true) {
      var request = new XMLHttpRequest();
      var url_2 = `${this.projectsApi}/project.${startID}.json`
      request.open('GET', url_2, false);
      request.send();
      
      if (request.status === 200) {
        var project = JSON.parse(request.response);

        project.id = project.ProjectID.toString()
        project.ProjectID = parseInt(project.ProjectID)
        project.BuildingID = parseInt(project.BuildingID)
        projects.push(project);
        startID++;
      } else {
        break
      }
    }
    return of(projects)
  }

  /**
   * Send a PUT request to update a project in database.
   * @param project Modified Project object
   * @returns The updated Project object
   */
  updateProject(project: Project): Observable<Project> {
    const url = `${this.projectsApi}/update.project.json`
    return this.http.post<Project>(url, project, this.httpOptions).pipe(
      tap((_) => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<Project>('updateProject', project))
    );
  }

  createProject(buildingID: number): Observable<Project> {
    const newProject = {
      id: '999',
      ProjectID: 999,
      BuildingID: buildingID,
      Name: 'new project',
      StartDate: '08Jul2021',
      EndDate: '17Aug2021',
      ProjectManager: 'manager',
      ContactPerson: 'contact person',
      Contractor: 'contractor',
      Status: ProjectStatus.Scheduled,
      Works: [],
      Comments: []
    }

    return this.getProjectsSync().pipe(
      mergeMap(projects => {
        const projectIds = projects.map(project => parseInt(project.id));
        const newId: number = Math.max(...projectIds) + 1;
        newProject.id = newId.toString();
        newProject.ProjectID = newId
        return this.addProject(newProject)
      })
    )
  }

  /**
   * Send a POST request to add a new project to database.
   * @param project the project to add
   * @returns An Observable of the added project
   */
  addProject(project: Project): Observable<Project> {
    const url = `${this.projectsApi}/update.project.json`
    return this.http
      .post<Project>(url, project, this.httpOptions)
      .pipe(
        tap((newProject: Project) =>
          this.log(`added project w/ id=${newProject.id}`)
        ),
        catchError(this.handleError<Project>('addProject', project))
      );
  }

  /**
   * Send a DELETE request to delete a porject from database.
   * @param id ID of project to delete
   * @returns An Observable of deleted project
   */
  deleteProject(id: string): Observable<Project> {
    const url = `${this.projectsApi}/delete.project.${id}.json`;

    return this.http.delete<Project>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted project id=${id}`)),
      catchError(this.handleError<Project>('deleteProject'))
    );
  }
  

  /**
   * General error handling funciton. Logs the error in console and display error message. Returns a fallback value as T.
   * @param operation Name of operation in error
   * @param result Fallback response
   * @returns Fallback response as T
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.messageService.showErrorMessage(`${operation} failed: ${error.message}`);

      // Go on with empty result
      return of(result as T);
    };
  }

  /**
   * General logging funciton. logs the message and displaly it in the app.
   * @param message message to display
   */
  private log(message: string) {
    console.log(message);
    this.messageService.showMessage(message);
  }
}
