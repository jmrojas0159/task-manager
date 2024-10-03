import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';
import { CreatePersonComponent } from './features/create-person/create-person.component';
import { ManageSkillsComponent } from './features/manage-skills/manage-skills.component';
import { ListApiComponent } from './components/list-api/list-api.component';


const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'list-api', component: ListApiComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

