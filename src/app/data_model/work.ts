export enum WorkStatus {
    Done = "Done",
    Ongoing = "Ongoing",
    Scheduled = "Scheduled",
    Postponed = "Postponed",
    Cancelled = "Cancelled"
}

export interface Work {
    Status: WorkStatus;
    TypeOfWork: string;
}