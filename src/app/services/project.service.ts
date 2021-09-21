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

  private projectsApi = 'api/projects';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Get a project by project ID
   * @param id project ID
   * @returns An Observable of the target Project. Returns an empty Project on error
   */
  getProject(id: string): Observable<Project> {
    const url = `${this.projectsApi}/${id}`;
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
   * Send a PUT request to update a project in database.
   * @param project Modified Project object
   * @returns The updated Project object
   */
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectsApi, project, this.httpOptions).pipe(
      tap((_) => this.log(`updated project id=${project.id}`)),
      catchError(this.handleError<Project>('updateProject', project))
    );
  }

  createProject(): Observable<Project> {
    const newProject = {
      id: '999',
      ProjectID: 999,
      BuildingID: 1,
      name: 'dummy project',
      startDate: '08Jul2021',
      finishDate: '17Aug2021',
      projectManager: 'manager',
      contactPerson: 'contact person',
      contractor: 'contractor',
      status: ProjectStatus.Current,
      workList: [],
      commentList: []
    }

    return this.getProjects().pipe(
      mergeMap(projects => {
        const projectIds = projects.map(project => parseInt(project.id));
        const newId: string = (Math.max(...projectIds) + 1).toString();
        newProject.id = newId;
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
    return this.http
      .post<Project>(this.projectsApi, project, this.httpOptions)
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
    const url = `${this.projectsApi}/${id}`;

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
