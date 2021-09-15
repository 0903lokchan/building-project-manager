import { Injectable } from '@angular/core';
import { Building } from '../data_model/building';
import { BUILDINGS } from '../mock_data/mock-buildings';
import { Observable, of } from 'rxjs';
import { User } from '../data_model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DirectoryService {
  private buildingsApi = 'api/buildings';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Fetch a list of buildings. A user may be passed as argument to filter output.
   * @param user Optional. If user if supplied the return list is filtered according to user access.
   * @returns An Observable of building list. Filtered according to user access if user argument is provided.
   */
  getBuildings(user?: User): Observable<Building[]> {
    //TODO make HTTP service request
    const buildings = of(BUILDINGS);

    //TODO implement user access filtering
    return this.http
      .get<Building[]>(this.buildingsApi)
      .pipe(
        map(buildings => {
          return buildings.map(building => {
            building.Name = building.Address.split(',')[0]
            return building
          })
        }),
        catchError(this.handleError<Building[]>('httpGetBuildings', [])));
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

  /**
   * Fetch a building by its ID from database.
   * @param id building ID
   * @returns An Observable of target building
   */
  getBuilding(id: string): Observable<Building> {
    //TODO make HTTP service request

    return of(BUILDINGS[0]);
  }

  /**
   * Send a POST request to create a new building entry in the database.
   * @param building building to add
   * @returns An Observable of added building
   */
  createBuilding(building: Building): Observable<Building> {
    //TODO find a unique ID for new building
    //TODO make HTTP service request
    return of(BUILDINGS[0]);
  }

  /**
   * Send a PUT request to update a building entry in database.
   * @param building Building to update
   * @returns An Observable of updated building.
   */
  updateBuilding(building: Building): Observable<Building> {
    //TODO check if building exist in DB, else throw an error or call createBuilding()
    //TODO make HTTP service request
    return of(BUILDINGS[0]);
  }
}
