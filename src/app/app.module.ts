import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { CreatePersonComponent } from './features/create-person/create-person.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';
import { ManageSkillsComponent } from './features/manage-skills/manage-skills.component';
import { TaskListComponent } from './features/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ListApiComponent } from './components/list-api/list-api.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskListComponent,
    ManageSkillsComponent,
    CreatePersonComponent,
    ListApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ListTableComponent,
    MultiSelectModule,
    ButtonModule,
    PanelModule,
    ListboxModule,
    HttpClientModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
