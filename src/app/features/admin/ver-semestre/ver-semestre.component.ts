import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-semestre',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './ver-semestre.component.html',
  styleUrls: ['./ver-semestre.component.scss']
})
export class VerSemestreComponent {
  semestreForm: FormGroup;
  semestreData = {
    semestre: '6',
    carrera: 'Ingeniería de Software',
    fechaInicio: '2025-01-01',
    fechaFin: '2025-06-30',
    totalMaterias: 8,
    materiasAprobadas: 6
  };

  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    this.semestreForm = this.fb.group({
      semestre: [{ value: '', disabled: true }, Validators.required],
      carrera: [{ value: '', disabled: true }, Validators.required],
      fechaInicio: [{ value: '', disabled: true }, Validators.required],
      fechaFin: [{ value: '', disabled: true }, Validators.required],
      totalMaterias: [{ value: '', disabled: true }, Validators.required],
      materiasAprobadas: [{ value: '', disabled: true }, Validators.required]
    });

    this.loadSemestreData();
  }

  loadSemestreData() {
    this.semestreForm.patchValue(this.semestreData);
  }

  enableEditing() {
    this.isEditing = true;
    this.semestreForm.enable();
  }

  cancelEditing() {
    this.isEditing = false;
    this.semestreForm.disable();
    this.loadSemestreData();
  }

  saveChanges() {
    if (this.semestreForm.valid) {
      console.log('Datos del semestre actualizados:', this.semestreForm.value);
      this.isEditing = false;
      this.semestreForm.disable();
    }
  }
}
