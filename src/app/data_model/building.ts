export interface Building {
    ID: number;
    Name?: string;
    Address: string;
    Owner: string;
    Img?: string;
    BuildingType: string;
    ConstructionDate: string;
    ProjectList: number[];
}