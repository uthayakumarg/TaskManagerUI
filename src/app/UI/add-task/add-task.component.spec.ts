import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MockTasks } from '../../Models/mock-tasks';
import { TestTaskService } from '../../Models/testing/test-task.service';
import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../../Services/task.service';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockRouter, MockActivatedRoute } from '../../../testing/mock-router.mock'
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgDatepickerModule } from 'ng2-datepicker';
import { ActivatedRoute } from '@angular/router';

const TASK = MockTasks[1];

let comp: AddTaskComponent;
let fixture: ComponentFixture<AddTaskComponent>;

/////// Tests //////

describe('AddTaskComponent', () => {
  let mockService = jasmine.createSpyObj(['getTaskById']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule, 
        NgDatepickerModule
      ],
      declarations: [
        AddTaskComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    fixture = TestBed.createComponent(AddTaskComponent);
    comp = fixture.componentInstance;
  }));

  it('should create component instance', () => {
    expect(comp).toBeTruthy();
  });
});