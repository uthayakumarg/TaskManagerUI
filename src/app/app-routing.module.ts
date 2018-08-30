import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';

const routes: Routes = [
  { path: 'addTask', component: AddTaskComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
