import { Comment } from "./comment";
import { Work } from "./work";

export enum ProjectStatus {
    Closed = "Closed",
    Current = "Current",
    Scheduled = "Scheduled",
    Unscheduled = "Unscheduled"
}

export interface Project{
    id: string;
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