import { Component, OnInit } from '@angular/core';
import { BUILDINGS } from "../mock_data/mock-buildings"
import { PROJECTS } from "../mock_data/mock_project";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent implements OnInit {
  build = BUILDINGS[0];
  projects = PROJECTS;
  constructor() { 

  }
  ngOnInit(): void {
  }


}
