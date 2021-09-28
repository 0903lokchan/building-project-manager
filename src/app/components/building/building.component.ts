import { Component, OnInit } from '@angular/core';
import { BUILDINGS } from '../../mock_data/mock-buildings';
import { PROJECTS } from '../../mock_data/mock_project';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../data_model/project';
import { Building } from '../../data_model/building';
import { ProjectStatus } from '../../data_model/project';
import { DirectoryService } from '../../services/directory.service';
import {
  concatMap,
  map,
  mergeAll,
  mergeMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { from, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnInit {
  buildingId!: number;
  build: Building = {
    ID: -1,
    Name: 'Dummy building',
    Address: 'Solar system',
    BuildingType: 'Dummy building',
    ConstructionDate: '21092021',
    Owner: 'Me=]',
    ProjectList: [],
  };

  projectClose: Project[] = [];
  projectCurrent: Project[] = [];
  projectSchedule: Project[] = [];
  projectUnschedule: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private buildingService: DirectoryService,
    private router: Router
  ) {}

  private getProjects(ids: number[]): Observable<Project[]> {
    return from(ids).pipe(
      mergeMap((id) => this.projectService.getProject(id.toString())),
      toArray()
    );
  }

  getBuildings(id: number): void {
    this.buildingService
      .getBuilding(id)
      .pipe(
        // fetch building information
        tap((building) => (this.build = building)),
        // transform to project id list
        map((building) => building.ProjectList || []),
        // transform to list of Project
        mergeMap((ids) => this.getProjects(ids))
      )
      .subscribe((projects) => {
        this.projectClose = [];
        this.projectCurrent = [];
        this.projectSchedule = [];
        this.projectUnschedule = [];
        // sort projects by their status
        projects.forEach((element) => {
          if (element.Status == ProjectStatus.Closed) {
            this.projectClose.push(element);
          } else if (element.Status == ProjectStatus.Current) {
            this.projectCurrent.push(element);
          } else if (element.Status == ProjectStatus.Scheduled) {
            this.projectSchedule.push(element);
          } else if (element.Status == ProjectStatus.Unscheduled) {
            this.projectUnschedule.push(element);
          }
        });
      });
  }

  ngOnInit(): void {
    this.buildingId = +(this.route.snapshot.paramMap.get('id') || '0');
    this.getBuildings(this.buildingId);
  }

  delete(id: string) {
    if (this.authService.getCurrentUser().UserType.match('manager')) {
      this.projectService.deleteProject(id).subscribe();
      this.getBuildings(this.buildingId);
    } else {
      alert('you are not the manager');
    }
  }

  add() {
    if (this.authService.getCurrentUser().UserType.match('manager')) {
      this.projectService.createProject(this.buildingId).subscribe((proj) => {
        this.router.navigate(['main', 'project', proj.id]);
      });
    } else {
      alert('you are not the manager');
    }
  }
}
