import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, ProjectStatus } from '../data_model/project';
import { AuthService } from '../auth.service';
import { User } from '../data_model/user';
import { Work, WorkStatus } from '../data_model/work';
import { ActivatedRoute } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Comment } from '../data_model/comment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}
  projectID!: string;
  workColumns: string[] = ['content', 'status'];
  commentColumns: string[] = ['author', 'comment'];
  project!: Project;
  editMode: boolean = false;
  editProject?: Project;
  currentUser!: User;
  isManager: boolean = this.currentUser?.UserType == "manager"

  @ViewChild(MatTable) workList!: MatTable<Work>;
  newCommentText?: string;
  // I know it's ugly but it's the only way I could make select in mat-table work
  workStatus = [
    WorkStatus.Ongoing,
    WorkStatus.Cancelled,
    WorkStatus.Done,
    WorkStatus.Postponed,
    WorkStatus.Scheduled,
  ];

  getProject(): void {
    this.projectService.getProject(this.projectID).subscribe((project) => {
      this.project = project ? project : {
        id: '0',
        name: 'dummy project',
        startDate: '08Jul2021',
        finishDate: '17Aug2021',
        projectManager: 'manager',
        contactPerson: 'contact person',
        contractor: 'contractor',
        status: ProjectStatus.Current,
        workList: [],
        commentList: []
      }
    });
  }

  sendProject(project: Project): Observable<boolean> {
    return this.projectService.updateProject(project).pipe(
      tap(success => {
        if (success) {
          // TODO create and use message service
          alert('Successfully updated project.');
          this.getProject();
        } else {
          alert('Update failed.');
        }
      })
    )
  }

  enterEdit(): void {
    this.editMode = true;
    this.editProject = { ...this.project };
  }

  revert(): void {
    this.editProject = { ...this.project };
  }

  exitEdit(): void {
    if (confirm('Save changes?')) {
      this.sendProject(this.editProject!).subscribe();
    }
    this.editMode = false;
    delete this.editProject;
  }

  archive(): void {
    if (!confirm('Confirm mark project as archived?')) {
      return;
    }
    const project = { ...this.project }
    project.status = ProjectStatus.Closed
    this.sendProject(project).subscribe();
  }

  open(): void {
    if (!confirm('Confirm mark project as current?')) {
      return;
    }
    const project = { ...this.project }
    project.status = ProjectStatus.Current
    this.sendProject(project).subscribe();
  }

  close(): void {
    if (!confirm('Confirm mark project as closed?')) {
      return;
    }
    const project = { ...this.project }
    project.status = ProjectStatus.Closed
    this.sendProject(project).subscribe();
  }

  createWork(): void {
    const newWork = prompt('Please enter name for the new work') || '';
    const project = {...this.project}
    project.workList.push({
      content: newWork,
      status: WorkStatus.Scheduled,
    });
    this.sendProject(project).subscribe(success => {
      if (success) {
        this.workList.renderRows();
      }
    })
  }

  deleteWork(id: number): void {
    const project = {...this.project}
    project.workList.splice(id, 1);
    this.sendProject(project).subscribe(success => {
      if (success) {
        this.workList.renderRows();
      }
    })
  }

  changeWorkStatus(): void {
    this.sendProject(this.project).subscribe(success => {
      if (success) {
        this.workList.renderRows();
      }
    })
  }

  createComment(): void {
    const project = { ...this.project }
    const newComment: Comment = {
      author: this.currentUser.LoginName,
      content: this.newCommentText!
    }
    project.commentList.push(newComment)
    this.sendProject(project).subscribe()
    delete this.newCommentText
  }

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      if (user) {
        this.currentUser = user;
      } else {
        //test user
        this.currentUser = {
          LoginName: 'manager',
          Password: 'password',
          UserType: 'manager',
        };
      }
    });
    this.projectID = this.route.snapshot.paramMap.get('id') || '0';
    this.getProject();
  }
}
