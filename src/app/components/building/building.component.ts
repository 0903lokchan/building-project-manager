import { Component, OnInit } from '@angular/core';
import { BUILDINGS } from "../../mock_data/mock-buildings"
import { PROJECTS } from "../../mock_data/mock_project";
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../data_model/project';
import { Building } from '../../data_model/building'
import { ProjectStatus } from '../../data_model/project';
import {DirectoryService} from '../../services/directory.service'
import { toHash } from 'ajv/dist/compile/util';
@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent implements OnInit {
  buildingId = 0;
  build = BUILDINGS[this.buildingId];
  projectFull = PROJECTS;
  project = this.build.projectList;
  buildings: Building[] =[];
  projects: Project[] = [];
  projectClose: Project[] = [];
  projectCurrent: Project[] = [];
  projectSchedule: Project[] = [];
  projectUnschedule: Project[] = [];
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private buildingService: DirectoryService) { 
    
  }

  getBuildings(): void {
    this.buildingService.getBuildings().subscribe( building => {
      building.forEach(element => {
        this.buildings.push(element);
        console.log("blabla")
      });
    });
    this.projectFull.forEach(element => {
      if(this.project.includes(+element.id)){
        this.projects.push(element);
      }
    });
    this.projectClose = [];
    this.projectCurrent =[];
    this.projectSchedule =[];
    this.projectUnschedule =[];
    this.projects.forEach(element => {
      if(element.status == ProjectStatus.Closed){
        this.projectClose.push(element);
      } else if(element.status == ProjectStatus.Current) {
        this.projectCurrent.push(element);
      } else if(element.status == ProjectStatus.Scheduled){
        this.projectSchedule.push(element);
      } else if(element.status == ProjectStatus.Unscheduled){
        this.projectUnschedule.push(element);
      }
  });
  }

  ngOnInit(): void {
    
    this.getBuildings()
    this.buildingId = +(this.route.snapshot.paramMap.get('id') || '0');
    console.log(this.buildingId);
    this.build = BUILDINGS[this.buildingId-1];
    this.project = this.build.projectList;
    this.project.forEach(element => {
      //console.log(element);
    });
  }

  httpGetBuildingList(){
		var theUrl = 'https://happybuildings.sim.vuw.ac.nz/api/dongpham/user_list.json'
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.send( null );
		return xmlHttp.responseText;
		}

  delete(id : string){
    this.projectService.deleteProject(id).subscribe();
    this.getBuildings()
  }
}
