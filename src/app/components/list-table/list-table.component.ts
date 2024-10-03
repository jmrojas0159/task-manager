import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Task } from 'src/app/core/models/task.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, FormsModule, ButtonModule, CheckboxModule],
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  @Input() dataSource: Task[] = [];
  data: Task[] = [];
  filteredData: Task[] = [];
  filterOption: string = 'all';
  globalFilter: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.data = this.dataSource;
    this.filteredData = [...this.data];

    console.log(this.filteredData);
  }

  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.globalFilter = input.value;
    this.filteredData = this.data.filter(data => {
      return Object.keys(data).some(key =>
        data[key as keyof Task].toString().toLowerCase().includes(this.globalFilter.toLowerCase())
      );
    });
    console.log(this.filteredData);
  }

  filterTasks(option: string) {
    this.filterOption = option;
    switch (option) {
      case 'completed':
        this.filteredData = this.data.filter(task => task.completed);
        break;
      case 'pending':
        this.filteredData = this.data.filter(task => !task.completed);
        break;
      default:
        this.filteredData = [...this.data];
    }
  }

  deleteTask(id: number) {
    this.data = this.data.filter(task => task.id !== id);
    this.filterTasks(this.filterOption); // Filtrar de nuevo para actualizar la tabla
  }

  addTask(){
    this.router.navigate(['/create-task']);
  }

}
