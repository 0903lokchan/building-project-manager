import { Project, ProjectStatus } from "../data_model/project";
import { Work, WorkStatus } from "../data_model/work";
import { Comment } from "../data_model/comment";

export const PROJECTS: Project[] = [
    {
        id: '0',
        ProjectID: 0,
        BuildingID: 1,
        Name: "project 1",
        Status: ProjectStatus.Closed,
        StartDate: "30Jul2021",
        EndDate: "30Oct2021",
        ContactPerson: "Ellen",
        ProjectManager: "Tim",
        Contractor: "Gill",
        Works: [
            {Status: WorkStatus.Ongoing, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager", Text: "You may comment in here."},
            { Author: "Owner", Text: "Cool." },
            {Author: "Contractor", Text: "Will do!"}
        ]
    },
    {
        id: '1',
        ProjectID: 1,
        BuildingID: 1,
        Name: "project 2",
        Status: ProjectStatus.Current,
        StartDate: "29Jul2021",
        EndDate: "29Oct2021",
        ContactPerson: "Elliot",
        ProjectManager: "Tom",
        Contractor: "George",
        Works: [
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Ongoing, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Postponed, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager2", Text: "You may comment in here."},
            {Author: "Owner2", Text: "Cool."},
            {Author: "Contractor2", Text: "Will do!"}
        ]
    },
    {
        id: '2',
        ProjectID: 2,
        BuildingID: 1,
        Name: "project 3",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '3',
        ProjectID: 3,
        BuildingID: 2,
        Name: "project 4",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '4',
        ProjectID: 4,
        BuildingID: 2,
        Name: "project 5",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "cccc",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '5',
        ProjectID: 5,
        BuildingID: 2,
        Name: "project 6",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '6',
        ProjectID: 6,
        BuildingID: 3,
        Name: "project 7",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '7',
        ProjectID: 7,
        BuildingID: 3,
        Name: "project 8",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    },
    {
        id: '8',
        ProjectID: 8,
        BuildingID: 3,
        Name: "project 9",
        Status: ProjectStatus.Scheduled,
        StartDate: "28Jul2021",
        EndDate: "28Oct2021",
        ContactPerson: "Eli",
        ProjectManager: "Tiff",
        Contractor: "Gio",
        Works: [
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 1"},
            {Status: WorkStatus.Cancelled, TypeOfWork: "Work 2"},
            {Status: WorkStatus.Scheduled, TypeOfWork: "Work 3"}
        ],
        Comments: [
            {Author: "Manager3", Text: "You may comment in here."},
            {Author: "Owner3", Text: "Cool."},
            {Author: "Contractor3", Text: "Will do!"}
        ]
    }
    
]