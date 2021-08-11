import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, ProjectStatus } from '../data_model/project';
import { AuthService } from '../auth.service';
import { User } from '../data_model/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  projectID!: string;
  workColumns: string[] = ['content', 'status'];
  commentColumns: string[] = ['author', 'comment'];
  project!: Project;
  editMode: boolean = false;
  editProject?: Project;
  currentUser!: User;

  getProject(): void {
    this.projectService.getProject(this.projectID).subscribe((project) => {
      this.project = project;
    });
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editProject = { ...this.project };
    } else {
      delete this.editProject;
    }
  }

  revert(): void {
    this.editProject = { ...this.project };
  }

  update(): void {
    // TODO generate general confirm dialog as material dialogs
    if (!confirm('Confirm update project?')) {
      return;
    }
    if (this.editProject) {
      this.projectService
        .updateProject(this.editProject)
        .subscribe((success) => {
          if (success) {
            // TODO create and use message service
            alert('Successfully updated project.');
            this.getProject();
          } else {
            alert('Update failed.');
          }
        });
    }
  }

  archive(): void {
    if (!confirm('Confirm mark project as archived?')) {
      return;
    }
    this.project.status = ProjectStatus.Closed;
    this.projectService.updateProject(this.project).subscribe((success) => {
      if (success) {
        // TODO create and use message service
        alert('Successfully updated project.');
      } else {
        alert('Update failed.');
      }
    });
  }

  open(): void {
    if (!confirm('Confirm mark project as current?')) {
      return;
    }
    this.project.status = ProjectStatus.Current;
    this.projectService.updateProject(this.project).subscribe((success) => {
      if (success) {
        // TODO create and use message service
        alert('Successfully updated project.');
      } else {
        alert('Update failed.');
      }
    });
  }

  close(): void {
    if (!confirm('Confirm mark project as closed?')) {
      return;
    }
    this.project.status = ProjectStatus.Closed;
    this.projectService.updateProject(this.project).subscribe((success) => {
      if (success) {
        // TODO create and use message service
        alert('Successfully updated project.');
      } else {
        alert('Update failed.');
      }
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.projectID = this.route.snapshot.paramMap.get('id') || '0';
    this.getProject();
  }
}
