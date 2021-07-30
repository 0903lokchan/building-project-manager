export enum WorkStatus {
    Done,
    Ongoing,
    Scheduled,
    Postponed,
    Cancelled
}

export interface Work {
    status: WorkStatus;
    content: string;
}