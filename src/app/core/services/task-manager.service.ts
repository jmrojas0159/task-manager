// services/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/taskApi.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  constructor(private http: HttpClient) {}



  tasks$ = this.tasksSubject.asObservable();

  async addTask(task: Task): Promise<void> {
    return new Promise((resolve) => {
      this.tasks.push({ ...task, id: this.tasks.length + 1 });
      this.tasksSubject.next(this.tasks);
      resolve();
    });
  }

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  async toggleTaskCompletion(id: number): Promise<void> {
    return new Promise((resolve) => {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        this.tasksSubject.next(this.tasks);
      }
      resolve();
    });
  }

  async filterTasks(completed: boolean): Promise<Task[]> {
    return new Promise((resolve) => {
      const filteredTasks = this.tasks.filter(task => task.completed === completed);
      resolve(filteredTasks);
    });
  }

}
