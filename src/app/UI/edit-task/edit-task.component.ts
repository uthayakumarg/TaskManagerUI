import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../Models/task';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;
  task: Task = new Task();
  oldTask: Task;
  parentTasks: Task[];

  error: any = { isError: false, errorMessage: '' };
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

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utility: UtilityService
    ) { }

  ngOnInit() {
    this.initialize();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadParentTasks();
      this.loadTask(this.id);
   });
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id)
      .subscribe(
        task => {
          this.task = task;
        },
        error => {
          console.log(error);
        },
        () => {
          this.loadFormValues();
          this.oldTask = this.task;
        });
  }

  loadParentTasks(): void {
    this.taskService.getTasks()
      .subscribe(
        task => {this.parentTasks = task},
        error => {
          console.log(error);
        });
  }

  reset(form: NgForm): void {
    this.error.isError = false;
    this.initialize();
    this.task = this.oldTask;
    this.loadFormValues();
  }

  updateTask(): void {
    if (!this.taskForm.valid) {
      return;
    }

    this.error.isError = false;

    var taskInput = this.taskForm.value;

    this.task = {
      TaskId: this.id,
      TaskName: taskInput.taskName,
      ParentId: taskInput.parentTask,
      ParentName: '',
      StartDate: this.utility.getStringifiedDate(taskInput.startDate),
      EndDate: this.utility.getStringifiedDate(taskInput.endDate),
      Priority: taskInput.priority,
      CreatedBy: this.task.CreatedBy,
      UpdatedBy: 'TaskManagerUI',
      ActiveInd: 'Y'
    }
    if (!this.validate(this.task)) {
      return;
    }
    this.loading = true;
    console.log(this.task);
    this.taskService.updateTask(this.task)
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

  cancel(): void {
    this.router.navigate(['/viewTask']);
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

  loadFormValues(): void {
    this.taskForm.patchValue({
      taskName: this.task.TaskName,
      priority: this.task.Priority, 
      parentTask: this.task.ParentId,
      startDate: this.task.StartDate,
      endDate: this.task.EndDate
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

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
