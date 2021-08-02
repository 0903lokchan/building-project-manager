import { Component, OnInit } from '@angular/core';
import { BUILDINGS } from "../mock_data/mock-buildings"

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})

export class BuildingComponent implements OnInit {
  build = BUILDINGS[0];
  constructor() { 

  }
  ngOnInit(): void {
  }

}
