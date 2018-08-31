import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TaskService } from './task.service';
import { Task } from "../Models/task";
import { MockTasks } from "../Models/mock-tasks";
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    taskService = TestBed.get(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getTasks ', () => {
    let expectedTasks: Task[];

    beforeEach(() => {
      taskService = TestBed.get(TaskService);
      expectedTasks = MockTasks;
    });

    it('should return expected tasks (All)', () => {
      taskService.getTasks().subscribe(
        tasks => expect(tasks).toEqual(expectedTasks, 'should return expected heroes'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getTasksUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTasks);
    });

    it('should be OK returning no tasks', () => {
      taskService.getTasks().subscribe(
        tasks => expect(tasks.length).toEqual(0, 'should have empty tasks array'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getTasksUrl);
      req.flush([]); 
    });

    it('should return the expected task (Single)', () => {
      const taskId: number = 2;
      let expectedTask = MockTasks[taskId - 1];

      taskService.getTaskById(taskId).subscribe(
        task => expect(task).toEqual(expectedTask, 'should return expected heroes'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.getTaskUrl + '/?taskId=' + taskId);      
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTask);
    });
  });

  describe('#updateTask', () => {
    it('should update a task and return it', () => {

      const task: Task = MockTasks[0];

      taskService.updateTask(task).subscribe(
        data => expect(data).toEqual(task, 'should return the task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.updateTaskUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });

  describe('#endTask', () => {

    it('should inactivate the task and return it', () => {

      const taskId: number = 2;
      const userId: string = 'TaskManagerTest';

      const expectedTask: Task = MockTasks[2];

      taskService.endTask(taskId, userId).subscribe(
        data => expect(data).toBeNull,
        fail
      );

      const req = httpTestingController.expectOne(taskService.endTaskUrl + '/?taskId=' + taskId + '&userId=' + userId);
      expect(req.request.method).toEqual('PUT');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK' });
      req.event(expectedResponse);
    });
  });

  describe('#addTask', () => {
    it('should create a task and return it', () => {

      const task: Task = MockTasks[1];

      taskService.addTask(task).subscribe(
        data => expect(data).toEqual(task, 'should return the task'),
        fail
      );

      const req = httpTestingController.expectOne(taskService.addTaskUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(task);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: task });
      req.event(expectedResponse);
    });
  });

});
