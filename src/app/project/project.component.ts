import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../project.service";
import { Project, ProjectStatus } from "../data_model/project";
import { AuthService } from '../auth.service';
import { User } from '../data_model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private authService: AuthService, private route: ActivatedRoute) { }
  workColumns: string[] = ['content', 'status']
  commentColumns: string[] = ['author', 'comment']
  project!: Project;
  editMode: boolean = false;
  editProject?: Project;
  currentUser!: User;

  getProject(id: string | null): void {
    if (id) {
      this.projectService.getProject(id)
      .subscribe(project => {
        this.project = project;
      });
    }
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
    this.authService.getCurrentUser$().subscribe(user => { if (user) { this.currentUser = user } })
    const projectID = this.route.snapshot.paramMap.get('id');
    this.getProject(projectID);
  }

}
