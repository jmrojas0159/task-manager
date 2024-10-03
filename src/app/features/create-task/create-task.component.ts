import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person, Task } from 'src/app/core/models/task.model';

import { TaskService } from 'src/app/core/services/task-manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {

  taskForm!: FormGroup;
  tasks: Task[] = [];
  minDate!: string;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', Validators.required],
      completed: [false],
      persons: this.fb.array([])
    });

    // Establecer la fecha mínima como hoy
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yyyy = today.getFullYear();
    this.minDate = `${yyyy}-${mm}-${dd}`;
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  onPersonsChanged(persons: Person[]) {
    this.persons.clear();
    persons.forEach(person => {
      this.persons.push(this.fb.control(person));
    });
  }

  private isDuplicateTask(taskName: string): boolean {
    return this.tasks.some(task => task.name === taskName);
  }

  async saveData() {
    if (this.taskForm.invalid) {
      this.showAlert('Ups...', 'Faltan campos por completar', 'warning');
      return;
    }

    if (this.isDuplicateTask(this.taskForm.value.name)) {
      this.showAlert('Error', 'La tarea ya existe', 'warning');
      return;
    }

    await this.taskService.addTask(this.converData());
    this.router.navigate(['/task-list']);
  }

  converData(): Task {
    return {
      id: 0,
      name: this.taskForm.value.name,
      date: this.taskForm.value.date,
      completed: this.taskForm.value.completed,
      people: this.taskForm.value.persons
    }
  }

  backList(){
    this.router.navigate(['/task-list']);
  }

  private showAlert(title: string, text: string, icon: 'success' | 'warning') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Aceptar'
    });
  }

}
