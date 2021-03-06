import { Injectable } from '@angular/core';
import { Building, BuildingResponse } from '../data_model/building';
import { BUILDINGS } from '../mock_data/mock-buildings';
import { Observable, of } from 'rxjs';
import { User } from '../data_model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private buildingsApi = 'https://happybuildings.sim.vuw.ac.nz/api/dongpham/building_dir.json';
  // private buildingsApi = 'api/buildings'
  constructor(
    private http: HttpClient,
    private projectService: ProjectService,
    private messageService: MessageService
  ) {}

  /**
   * Fetch a list of buildings. A user may be passed as argument to filter output.
   * @param user Optional. If user if supplied the return list is filtered according to user access.
   * @returns An Observable of building list. Filtered according to user access if user argument is provided.
   */
  getBuildings(user?: User): Observable<Building[]> {
    var allBuildings: Observable<Building[]> = this.http
      .get<BuildingResponse>(this.buildingsApi)
      .pipe(
        map(buildingResponse => buildingResponse.buildings),
        tap(buildings => console.log(buildings)),
        map((buildings) => {
          return buildings.map((building) => {
            building.Name = building.Address.split(',')[0];
            building.ID = parseInt(building.ID.toString())
            return building;
          });
        }),
        catchError(this.handleError<Building[]>('httpGetBuildings', []))
    );
    
    allBuildings = this.fetchProjectInfo(allBuildings);

    if (user) {
      return this.filterBuildings(allBuildings, user)
    } else {
      return allBuildings
    }
  }

  /**
   * Add a mapping to the Building array observable to add in project list and contractor list information.
   * @param buildings Building array observables consisting raw buildings data from API
   * @returns a Building array observable with additional information from children projects  
   */
  private fetchProjectInfo(buildings: Observable<Building[]>): Observable<Building[]> {
    return this.projectService.getProjectsSync().pipe(
      mergeMap(projects => {
        const projMap: Map<number, number[]> = new Map();
        const contractorMap : Map<number, string[]> = new Map()
        
        // find the project list for each building
        projects.forEach(project => {
          // put project ID into project list for matching building
          const projId: number = project.ProjectID;
          const buildId: number = project.BuildingID;
          if (!projMap.has(buildId)) {
            projMap.set(buildId, []);
          }
          projMap.get(buildId)!.push(projId);

          // put contractor into list for matching building
          const contractor: string = project.Contractor;
          if (!contractorMap.has(buildId)) {
            contractorMap.set(buildId, [])
          }
          contractorMap.get(buildId)!.push(contractor)
        })

        return buildings.pipe(
          map((buildings) => {
            return buildings.map((building) => {
              building.ProjectList = projMap.get(building.ID) || [];
              building.ContractorList = contractorMap.get(building.ID) || [];
              return building
            })
          })
        )
      })
    )
  }

  private filterBuildings(buildings: Observable<Building[]>, user: User): Observable<Building[]> {
    switch (user?.UserType) {
      case 'manager':
        return buildings;

      case 'owner':   
        return buildings.pipe(
          map((buildings) => {
            return buildings.filter((building) => {
              return building.Owner == user.LoginName;
            });
          })
        );

      case 'contractor':
        return buildings.pipe(
          map((buildings) => {
            return buildings.filter((building) => {
              return building.ContractorList?.includes(user.LoginName)
            })
          })
        );

      default:
        return buildings;
    }
  }

  /**
   * Fetch a building by its ID from database.
   * @param id building ID
   * @returns An Observable of target building
   */
  getBuilding(id: number): Observable<Building> {
    return this.getBuildings().pipe(
      map(buildings => {
        return buildings.filter(building => {
          return building.ID == id;
        })[0]
      }),
      catchError(this.handleError<Building>('getBuilding'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.messageService.showErrorMessage(
        `${operation} failed: ${error.message}`
      );

      // Go on with empty result
      return of(result as T);
    };
  }
}
