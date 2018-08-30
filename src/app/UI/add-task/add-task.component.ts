import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../Models/task';
import { TaskService } from '../../Services/task.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  error: any = { isError: false, errorMessage: '' };
  task: Task;
  tasks: Task[];
  parentTasks: Task[];
  taskForm: FormGroup;
  loading: boolean;
  dateOptions: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    addClass: 'form-control',
    useEmptyBarTitle: false,
    barTitleFormat: 'MMMM YYYY'    
  };

  constructor(private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private utility: UtilityService) { }

  ngOnInit() {
    this.initialize();
    this.loadParentTasks();
  }

  addTask(): void {
    if (!this.taskForm.valid) {
      return;
    }

    this.error.isError = false;

    var taskInput = this.taskForm.value;
    this.task = {
      TaskId: 0,
      TaskName: taskInput.taskName,
      ParentId: taskInput.parentTask,
      ParentName: '',
      StartDate: this.utility.getStringifiedDate(taskInput.startDate),
      EndDate: this.utility.getStringifiedDate(taskInput.endDate),
      Priority: taskInput.priority,
      CreatedBy: 'TaskManagerUI',
      UpdatedBy: null,
      ActiveInd: 'Y'
    }

    if (!this.validate(this.task)) {
      return;
    }
    console.log(this.task);
    this.loading = true;
    this.taskService.addTask(this.task)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl('/viewTask');
        },
        error => {
          this.error = { isError: true, errorMessage: error }
          this.loading = false;
          console.log(error);
        });
  }

  loadParentTasks(): void {
    this.taskService.getTasks()
      .subscribe(
        task => {
          this.tasks = task;
          this.parentTasks = task.filter((t) => t.ActiveInd == 'Y');
        },
        error => {
          console.log(error);
        });
  }

  reset(form: NgForm): void {
    this.error.isError = false;
    form.resetForm();
    this.initialize();
  }

  initialize(): void {
    this.taskForm = this.formBuilder.group({
      taskName: new FormControl('', Validators.required),
      priority: new FormControl('', {
        validators: [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.maxLength(8)]
      }), 
      parentTask: new FormControl(''),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    });
  }

  validate(task: Task): boolean {
    if (task.EndDate < task.StartDate) {
      this.error = {
        isError: true, errorMessage: "End Date cannot be before start date"
      };
      return false;
    }
    return true;
  }

  get taskName() { return this.taskForm.get('taskName'); }
  get priority() { return this.taskForm.get('priority'); }
  get parentTask() { return this.taskForm.get('parentTask'); }
  get startDate() { return this.taskForm.get('startDate'); }
  get endDate() { return this.taskForm.get('endDate'); }
}
