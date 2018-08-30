import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { asyncData } from '../../../testing';
import { map } from 'rxjs/operators';
import { MockTasks } from '../mock-tasks';
import { Task } from '../task';
import { TaskService }   from '../../Services/task.service';

@Injectable()
/**
 * This is a mock service pretends to make real http requests.
*/
export class TestTaskService extends TaskService {

  constructor() {
    super(null);
  }

  tasks = MockTasks;
  result: Observable<any>; 

  // addHero(task: Task): Observable<Task> {
  //   let taskId = MockTasks.length;
  //   task.TaskId = taskId + 1;
  //   this.tasks.push(task);
  //   return this.result = asyncData(task);
  // }

  // getTasks(): Observable<Task[]> {
  //   return this.result = asyncData(this.tasks);
  // }

  // getTaskById(id: number): Observable<Task> {
  //   let task = this.tasks.find(t => t.TaskId === id);
  //   return this.result = asyncData(task);
  // }

  // updateHero(task: Task): Observable<Task> {
  //   return this.result = this.getTaskById(task.TaskId).pipe(
  //     map(t => {
  //       if (t) {
  //         return Object.assign(t, task);
  //       }
  //       throw new Error(`Task ${task.TaskId} not found`);
  //     })
  //   );
  // }
}
