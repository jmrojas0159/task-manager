import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss']
})
export class ManageSkillsComponent implements OnInit, OnChanges {

  @Output() skillsChanged = new EventEmitter<string[]>();
  @Input() isShow!: boolean;

  skillForm: FormGroup;
  skills: string[] = [];
  showTable: boolean = true;

  constructor(private fb: FormBuilder) {
    this.skillForm = this.fb.group({
      skillName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.showTable = this.isShow;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isShow'] && !changes['isShow'].firstChange) {
      this.showTable = this.isShow;
    }
  }

  addSkill() {
    if (this.skillForm.invalid) {
      this.showAlert('Ups...', 'Faltan campos por completar..', 'warning');
      return;
    }

    const skillName = this.skillForm.value.skillName.trim();

    if (skillName) {
      if (this.skills.includes(skillName)) {
        this.showAlert('Ups...', 'La habilidad ya existe.', 'warning');
      } else {
        if(!this.showTable){
          this.skills = [];
        }
        this.showTable = true;
        this.skills.push(skillName);
        this.skillForm.reset();
        this.skillsChanged.emit(this.skills); // Emitir la lista actualizada
      }
    }
  }

  deleteSkill(data: any, index: any) {
    this.skills.splice(index, 1);
    this.skillsChanged.emit(this.skills); // Emitir la lista actualizada
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
