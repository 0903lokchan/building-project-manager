import { Injectable } from '@angular/core';
import { Building } from "./building";
import { BUILDINGS } from "./mock-buildings";
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
