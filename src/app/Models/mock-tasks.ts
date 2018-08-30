import { Task } from "src/app/Models/task";

export const MockTasks: Task[] = [
    {
        TaskId: 1,
        TaskName: 'Perform Coding',
        ParentId: 1,
        ParentName: 'Project Work',
        StartDate: new Date(),
        EndDate: new Date(),
        Priority: 1,
        CreatedBy: null,
        UpdatedBy: null,
        ActiveInd: 'Y'
    },
    {
        TaskId: 2,
        TaskName: 'Perform Unit Testing',
        ParentId: 1,
        ParentName: 'Project Work',
        StartDate: new Date(),
        EndDate: new Date(),
        Priority: 2,
        CreatedBy: null,
        UpdatedBy: null,
        ActiveInd: 'Y'
    },
    {
        TaskId: 3,
        TaskName: 'Perform Code Review',
        ParentId: 1,
        ParentName: 'Project Work',
        StartDate: new Date(),
        EndDate: new Date(),
        Priority: 3,
        CreatedBy: null,
        UpdatedBy: null,
        ActiveInd: 'N'
    }
]
