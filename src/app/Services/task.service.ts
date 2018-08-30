import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment'  
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

import { MockTasks } from '../Models/mock-tasks';
import { Task } from '../Models/task';
import { throwError } from 'rxjs/internal/observable/throwError';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasksUrl: string = `${environment.apiBaseUrl}/tasks/getalltasks`;
  getTaskUrl: string = `${environment.apiBaseUrl}/tasks/gettaskbyid`;
  addTaskUrl: string = `${environment.apiBaseUrl}/tasks/create`;
  updateTaskUrl: string = `${environment.apiBaseUrl}/tasks/update`;
  endTaskUrl: string = `${environment.apiBaseUrl}/tasks/endtask`;

  constructor(private http: HttpClient) { }

  getTasks():  Observable<Task[]> {
    return this.http.get<Task[]>(this.getTasksUrl)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.getTaskUrl}/?taskId=${id}`)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.addTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.updateTaskUrl, task)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }

  endTask(id: number, userId: string): Observable<Task> {
    let url = `${this.endTaskUrl}/?taskId=${id}&userId=${userId}`;
    return this.http.put<Task>(url, null)
      .pipe(
        catchError(error => {
          console.log(error);
          throw('Server error occurred. Please try again later.');
        })
      );
  }
}
