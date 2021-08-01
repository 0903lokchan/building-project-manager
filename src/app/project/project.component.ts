import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../project.service";
import { Project } from "../data_model/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  project: Project | undefined;

  getProject(): void {
    this.projectService.getProject(1)
      .subscribe(project => {
        this.project = project;
      });
  }


  ngOnInit(): void {
    this.getProject();
  }

}
