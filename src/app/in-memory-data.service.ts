import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BUILDINGS } from './mock_data/mock-buildings';
import { PROJECTS } from './mock_data/mock_project';
import { USERS } from './mock_data/mock_users';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {
      users: USERS,
      projects: PROJECTS,
      buildings: BUILDINGS
    }
  }
}
