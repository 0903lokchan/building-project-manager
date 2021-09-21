import { Project, ProjectStatus } from "../data_model/project";
import { Work, WorkStatus } from "../data_model/work";
import { Comment } from "../data_model/comment";

export const PROJECTS: Project[] = [
    {
        id: '0',
        ProjectID: 0,
        BuildingID: 1,
        name: "project 1",
        status: ProjectStatus.Closed,
        startDate: "30Jul2021",
        finishDate: "30Oct2021",
        contactPerson: "Ellen",
        projectManager: "Tim",
        contractor: "Gill",
        workList: [
            {status: WorkStatus.Ongoing, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager", content: "You may comment in here."},
            { author: "Owner", content: "Cool." },
            {author: "Contractor", content: "Will do!"}
        ]
    },
    {
        id: '1',
        ProjectID: 1,
        BuildingID: 1,
        name: "project 2",
        status: ProjectStatus.Current,
        startDate: "29Jul2021",
        finishDate: "29Oct2021",
        contactPerson: "Elliot",
        projectManager: "Tom",
        contractor: "George",
        workList: [
            {status: WorkStatus.Cancelled, content: "Work 1"},
            {status: WorkStatus.Ongoing, content: "Work 2"},
            {status: WorkStatus.Postponed, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager2", content: "You may comment in here."},
            {author: "Owner2", content: "Cool."},
            {author: "Contractor2", content: "Will do!"}
        ]
    },
    {
        id: '2',
        ProjectID: 2,
        BuildingID: 1,
        name: "project 3",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '3',
        ProjectID: 3,
        BuildingID: 2,
        name: "project 4",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '4',
        ProjectID: 4,
        BuildingID: 2,
        name: "project 5",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '5',
        ProjectID: 5,
        BuildingID: 2,
        name: "project 6",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '6',
        ProjectID: 6,
        BuildingID: 3,
        name: "project 7",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '7',
        ProjectID: 7,
        BuildingID: 3,
        name: "project 8",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    },
    {
        id: '8',
        ProjectID: 8,
        BuildingID: 3,
        name: "project 9",
        status: ProjectStatus.Scheduled,
        startDate: "28Jul2021",
        finishDate: "28Oct2021",
        contactPerson: "Eli",
        projectManager: "Tiff",
        contractor: "Gio",
        workList: [
            {status: WorkStatus.Scheduled, content: "Work 1"},
            {status: WorkStatus.Cancelled, content: "Work 2"},
            {status: WorkStatus.Scheduled, content: "Work 3"}
        ],
        commentList: [
            {author: "Manager3", content: "You may comment in here."},
            {author: "Owner3", content: "Cool."},
            {author: "Contractor3", content: "Will do!"}
        ]
    }
    
]