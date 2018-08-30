import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Task } from 'src/app/Models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  error: any = { isError: false, errorMessage: '' };
  loading: boolean;
  
  // ngModel variables for the Search terms
  taskTerm: any = undefined;
  parentTerm: any = undefined;
  strtDtTerm: any = undefined;
  endDtTerm: any = undefined;
  priorityFrom: any = undefined;
  priorityTo: any = undefined;

  constructor(private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks()
      .subscribe(
        task => {
          this.tasks = task;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

  endTask(id: number): void {
    this.loading = true;
    this.taskService.endTask(id, 'TaskManagerUI')
      .subscribe(
        response => {
          console.log(response);
          this.loadTasks();
        },
        error => {
          this.error = { isError: true, errorMessage: error }
          this.loading = false;
          console.log(error);
        });
  }

}
