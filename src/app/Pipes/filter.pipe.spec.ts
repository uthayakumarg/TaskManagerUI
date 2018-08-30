import { FilterPipe } from './filter.pipe';
import { Task } from 'src/app/Models/task';

describe('FilterPipe', () => {
  let mockTasks: Task[];
  let testPipe = new FilterPipe();  

  beforeEach(() => {
    mockTasks = [
      { TaskId: 1, TaskName: 'Project Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 1, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 2, TaskName: 'Management Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 2, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 4, TaskName: 'Testing for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('05/15/2018'), EndDate: new Date('06/18/2018'), Priority: 4, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 5, TaskName: 'Generate Status report', ParentId: 2, ParentName: 'Management Tasks', StartDate: new Date('11/22/2018'), EndDate: new Date('12/30/2018'), Priority: 5, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' }
    ];
  });

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter based on task name', () => {
    let filter: any = { TaskName : 'module' }
    let expectedResult: any[] = [
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 4, TaskName: 'Testing for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('05/15/2018'), EndDate: new Date('06/18/2018'), Priority: 4, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' }
    ];
    expect(testPipe.transform(mockTasks, filter, 0, 0)).toEqual(expectedResult);
  });

  it('should filter based on Parent name', () => {
    let filter: any = { ParentName: 'Management' }
    let expectedResult: any[] = [
      { TaskId: 5, TaskName: 'Generate Status report', ParentId: 2, ParentName: 'Management Tasks', StartDate: new Date('11/22/2018'), EndDate: new Date('12/30/2018'), Priority: 5, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' }
    ];
    expect(testPipe.transform(mockTasks, filter, 0, 0)).toEqual(expectedResult);
  });

  it('should filter based on priority from', () => {
    let priorityFrom: number = 3;
    let expectedResult: any[] = [
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 4, TaskName: 'Testing for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('05/15/2018'), EndDate: new Date('06/18/2018'), Priority: 4, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 5, TaskName: 'Generate Status report', ParentId: 2, ParentName: 'Management Tasks', StartDate: new Date('11/22/2018'), EndDate: new Date('12/30/2018'), Priority: 5, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' }
    ];
    expect(testPipe.transform(mockTasks, {}, priorityFrom, 0)).toEqual(expectedResult);
  });

  it('should filter based on priority to', () => {
    let priorityTo: number = 3;
    let expectedResult: any[] = [
      { TaskId: 1, TaskName: 'Project Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 1, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 2, TaskName: 'Management Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 2, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
    ];
    expect(testPipe.transform(mockTasks, {}, 0, priorityTo)).toEqual(expectedResult);
  });

  it('should filter based on priority from and priority to', () => {
    let priorityFrom: number = 2;
    let priorityTo: number = 3;
    let expectedResult: any[] = [
      { TaskId: 2, TaskName: 'Management Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 2, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
    ];
    expect(testPipe.transform(mockTasks, {}, priorityFrom, priorityTo)).toEqual(expectedResult);
  });

  it('should filter based on Start date', () => {
    let filter: any = { StartDate: '01/' }
    let expectedResult: any[] = [
      { TaskId: 1, TaskName: 'Project Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 1, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 2, TaskName: 'Management Tasks', ParentId: 0, ParentName: '', StartDate: new Date('01/01/2018'), EndDate: new Date('12/31/2018'), Priority: 2, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
    ];
    expect(testPipe.transform(mockTasks, filter, 0, 0)).toEqual(expectedResult);
  });

  it('should filter based on End date', () => {
    let filter: any = { EndDate: '30' }
    let expectedResult: any[] = [
      { TaskId: 5, TaskName: 'Generate Status report', ParentId: 2, ParentName: 'Management Tasks', StartDate: new Date('11/22/2018'), EndDate: new Date('12/30/2018'), Priority: 5, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' }
    ];
    expect(testPipe.transform(mockTasks, filter, 0, 0)).toEqual(expectedResult);
  });

  it('should filter based on Start date and End date', () => {
    let filter: any = { TaskName : '', ParentName: '', StartDate: '01', EndDate: '03' }
    let expectedResult: any[] = [
      { TaskId: 3, TaskName: 'Coding for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('02/01/2018'), EndDate: new Date('03/10/2018'), Priority: 3, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
    ];
    expect(testPipe.transform(mockTasks, filter, 0, 0)).toEqual(expectedResult);
  });

  it('should filter based on multiple combinations', () => {
    let filter: any = { TaskName : 'mod', ParentName: 'pro', StartDate: '15', EndDate: '2018' }
    let priorityFrom: number = 3;
    let priorityTo: number = 5;
    let expectedResult: any[] = [
      { TaskId: 4, TaskName: 'Testing for module 1', ParentId: 1, ParentName: 'Project Tasks', StartDate: new Date('05/15/2018'), EndDate: new Date('06/18/2018'), Priority: 4, CreatedBy: null, UpdatedBy: null, ActiveInd: 'Y' },
    ];
    expect(testPipe.transform(mockTasks, filter, priorityFrom, priorityTo)).toEqual(expectedResult);
  });

});
