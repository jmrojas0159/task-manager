import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task.model';
import { TaskService } from 'src/app/core/services/task-manager.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  toggleCompletion(task: Task) {
    this.taskService.toggleTaskCompletion(task.id);
  }


  filterTasks(completed: boolean) {
    return this.taskService.filterTasks(completed);
  }

  addTask(){
    this.router.navigate(['/create-task']);
  }
}
