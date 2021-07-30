import { Comment } from "./comment";
import { Work } from "./work";

export enum ProjectStatus {
    Closed,
    Current,
    Scheduled,
    Unscheduled
}

export interface Project{
    id: number;
    name: string;
    status: ProjectStatus;
    startDate: string;
    finishDate: string;
    contactPerson: string;
    projectManager: string;
    contractor: string;
    workList: Work[];
    commentList: Comment[];
}