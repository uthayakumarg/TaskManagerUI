import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { MockTasks } from '../../Models/mock-tasks';
import { TestTaskService } from '../../Models/testing/test-task.service';
import { ViewTaskComponent } from './view-task.component';
import { TaskService } from '../../Services/task.service';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { MockRouter } from '../../../testing/mock-router.mock'
import { of } from 'rxjs';

const TASKS = MockTasks;

let comp: ViewTaskComponent;
let fixture: ComponentFixture<ViewTaskComponent>;

/////// Tests //////

describe('ViewTaskComponent', () => {
  let mockService = jasmine.createSpyObj(['getTasks']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        ViewTaskComponent,
        FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TaskService, useValue: mockService },
        { provide: Router, useClass: MockRouter },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    fixture = TestBed.createComponent(ViewTaskComponent);
    comp = fixture.componentInstance;
  }));

  it('should create component instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should load the tasks', () => {
    let expectedTaskLength = TASKS.length;
    mockService.getTasks.and.returnValue(of(TASKS));
    fixture.componentInstance.loadTasks();
    fixture.detectChanges();
    expect(fixture.componentInstance.tasks.length).toBe(expectedTaskLength);
  })
});