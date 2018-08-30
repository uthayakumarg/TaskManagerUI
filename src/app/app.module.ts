import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgDatepickerModule } from 'ng2-datepicker';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { FilterPipe } from './Pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgDatepickerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
