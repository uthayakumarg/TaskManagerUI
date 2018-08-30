import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
//import { addMatchers, newEvent, RouterStubsModule } from '../../../testing';
import { MockTasks } from '../../Models/mock-tasks';
import { TestTaskService } from '../../Models/testing/test-task.service';
import { AppModule } from '../../app.module';
import { ViewTaskComponent } from './view-task.component';
import { TaskService } from '../../Services/task.service';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const TASKS = MockTasks;

let comp: ViewTaskComponent;
let fixture: ComponentFixture<ViewTaskComponent>;
let page: Page;

/////// Tests //////

describe('ViewTaskComponent', () => {

  beforeEach(async(() => {
    //addMatchers();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: TaskService, useClass: TestTaskService },
        { provide: Router, useValue: routerSpy },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents()
      .then(createComponent);
  }));

  it('should display tasks', () => {
    expect(page.taskRows.length).toBeGreaterThan(0);
  });

  it('1st task should match 1st test task', () => {
    const expectedTask = TASKS[0];
    const actualTask = page.taskRows[0].textContent;
    expect(actualTask).toContain(expectedTask.TaskId.toString(), 'task.TaskId');
    expect(actualTask).toContain(expectedTask.TaskName, 'task.TaskName');
  });

  // it('should select hero on click', fakeAsync(() => {
  //   const expectedHero = HEROES[1];
  //   const li = page.heroRows[1];
  //   li.dispatchEvent(newEvent('click'));
  //   tick();
  //   // `.toEqual` because selectedHero is clone of expectedHero; see FakeHeroService
  //   expect(comp.selectedHero).toEqual(expectedHero);
  // }));

  it('should navigate to selected task detail on click', fakeAsync(() => {
    const expectedTask = MockTasks[1];
    const tr = page.taskRows[1];
    //tr.dispatchEvent(newEvent('click'));
    tick();

    // should have navigated
    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');

    // composed task detail will be URL like 'heroes/42'
    // expect link array with the route path and hero id
    // first argument to router.navigate is link array
    const navArgs = page.navSpy.calls.first().args[0];
    expect(navArgs[0]).toContain('editTask', 'nav to tasks detail URL');
    expect(navArgs[1]).toBe(expectedTask.TaskId, 'expected task.TaskId');

  }));

});

/////////// Helpers /////

/** Create the component and set the `page` test variables */
function createComponent() {
  fixture = TestBed.createComponent(ViewTaskComponent);
  comp = fixture.componentInstance;

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    // got the tasks and updated component
    // change detection updates the view
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  /** Task line elements */
  taskRows: HTMLTableRowElement[];

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    const taskRowNodes = fixture.nativeElement.querySelectorAll('tr');
    this.taskRows = Array.from(taskRowNodes);

    // Get the component's injected router navigation spy
    const routerSpy = fixture.debugElement.injector.get(Router);
    this.navSpy = routerSpy.navigate as jasmine.Spy;
  };
}
