import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // <--- Aquí

import { MatFormFieldModule } from '@angular/material/form-field'; // <--- Y también Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-directory',
  standalone: true, // <-- IMPORTANTE
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatCardModule], // <-- Aquí los módulos necesarios
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
  studentForm: FormGroup;
  isEditing: boolean = false;  // Asegúrate de que isEditing sea booleano y esté en falso por defecto

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      idAlumno: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      telefono2: ['', [Validators.pattern('^[0-9]{10}$')]],
      carrera: ['', Validators.required],
      semestre: ['', Validators.required],
      periodo: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]]
    });

    this.loadStudentData();
  }

  loadStudentData() {
    const dummyData = {
      idAlumno: '2025001',
      nombre: 'Jokabel',
      apellidos: 'Rojas Morales',
      telefono1: '5512345678',
      telefono2: '5523456789',
      carrera: 'Ingeniería de Software',
      semestre: 'V',
      periodo: '2025-A',
      gmail: 'joka@gmail.com'
    };
    this.studentForm.patchValue(dummyData);
    this.studentForm.disable();
    this.studentForm.get('idAlumno')?.disable();
  }

  enableEditing() {
    this.isEditing = true;  // Cambiar a true para que se muestren los botones de actualizar, eliminar, etc.
    this.studentForm.enable();
    this.studentForm.get('idAlumno')?.disable();
  }

  cancelEditing() {
    this.isEditing = false;  // Cambiar a false para que se muestren los botones de editar
    this.studentForm.disable();
    this.studentForm.get('idAlumno')?.disable();
    this.loadStudentData();
  }

  saveChanges() {
    if (this.studentForm.valid) {
      console.log('Datos actualizados:', this.studentForm.value);
      this.isEditing = false;
      this.studentForm.disable();
      this.studentForm.get('idAlumno')?.disable();
    }
  }

  deleteData() {
    if (confirm('¿Estás seguro de eliminar tu información?')) {
      this.studentForm.reset();
      this.isEditing = true;
      this.studentForm.enable();
    }
  }
}
