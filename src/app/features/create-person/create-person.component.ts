import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Person } from './../../core/models/task.model';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent {

  @Output() personsChanged = new EventEmitter<Person[]>();

  personForm!: FormGroup;
  persons: Person[] = [];
  showSkills: boolean = true;

  constructor(private fb: FormBuilder) {

    this.personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required]],
      skills: this.fb.array([])
    });
  }

  get skills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  onSkillsChanged(skills: string[]) {
    this.showSkills = true;
    this.skills.clear();
    skills.forEach(skill => {
      this.skills.push(this.fb.control(skill));
    });
  }

  validateAge() {
    const edad = this.personForm.value.age;
    if (edad >= 18) {
      return true;
    } else {
      return false;
    }
  }

  saveData() {

    if (this.personForm.invalid) {
      this.showAlert('Ups...', 'Faltan campos por completar', 'warning');
      return;
    }

    if (this.personForm.value.skills.length == 0) {
      this.showAlert('Ups...', 'Debe agregar minimo una habilidad', 'warning');
      return;
    }

    if (!this.validateAge()) {
      this.showAlert('Ups...', 'La edad debe ser mayor o igual a 18 años.', 'warning');
      return;
    }

    if (this.isDuplicatePerson(this.personForm.value.fullName)) {
      this.showAlert('Error', 'La persona ya existe', 'warning');
      return;
    }


    this.persons.push(this.converData());

    this.showSkills = false;
    this.skills.clear();
    this.personForm.reset();

    this.personsChanged.emit(this.persons);
  }

  converData(): Person {
    return {
      fullName: this.personForm.value.fullName,
      age: this.personForm.value.age,
      skills: this.personForm.value.skills
    }
  }

  private isDuplicatePerson(fullName: string): boolean {
    return this.persons.some(person => person.fullName === fullName);
  }

  deletePerson(data: any, index: any) {
    this.persons.splice(index, 1);
    this.personsChanged.emit(this.persons);
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
