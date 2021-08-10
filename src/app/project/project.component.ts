import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../project.service";
import { Project, ProjectStatus } from "../data_model/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  workColumns: string[] = ['content', 'status']
  commentColumns: string[] = ['author', 'comment']
  project!: Project;
  editMode: boolean = false;
  editProject?: Project;

  getProject(): void {
    this.projectService.getProject(1)
      .subscribe(project => {
        this.project = project;
      });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editProject = { ...this.project }
    } else {
      delete this.editProject;
    }
  }

  revert(): void {
    this.editProject = { ...this.project }
  }

  update(): void { }
  
  archive(): void {
    this.project.status = ProjectStatus.Closed;
    // TODO call update service
  }
  
  open(): void {
    this.project.status = ProjectStatus.Current;
    // TODO call update service
   }

  close(): void {
    this.project.status = ProjectStatus.Closed;
    // TODO call update service
   }

  ngOnInit(): void {
    this.getProject();
  }

}
