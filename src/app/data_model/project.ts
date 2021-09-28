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
    ProjectID: number;
    BuildingID: number;
    Name: string;

    Status: ProjectStatus;
    StartDate: string;
    EndDate: string;
    ContactPerson: string;
    ProjectManager: string;
    Contractor: string;
    Works: Work[];
    Comments: Comment[];
}