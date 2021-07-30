import { Injectable } from '@angular/core';
import { Building } from "./data_model/building";
import { BUILDINGS } from "./mock_data/mock-buildings";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor() { }

  getBuildings(): Observable<Building[]> {
    const buildings = of(BUILDINGS);
    return buildings;
  }
}
