export interface Building {
    id: number;
    name?: string;
    address: string;
    owner: string;
    img?: string;
    type: string;
    dateOfConstruction: string;
    projectList: number[];
}