import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/core/models/taskApi.model';
import { TaskService } from 'src/app/core/services/task-manager.service';

@Component({
  selector: 'app-list-api',
  templateUrl: './list-api.component.html',
  styleUrls: ['./list-api.component.scss']
})
export class ListApiComponent  implements OnInit {
  tareas: Tarea[] = [];

  constructor(private tareaService: TaskService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareaService.obtenerTareas().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (error) => {
        console.error('Error al obtener las tareas:', error);
      }
    });
  }

}
