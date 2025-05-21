import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,  // Asegúrate de importar CommonModule
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  studentForm: FormGroup;
  isEditing: boolean = false;

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
      gmail: ['', [Validators.required, Validators.email]],
      foto: [''] // Foto de perfil
    });

    this.loadStudentData();
  }

  loadStudentData() {
    const dummyData = {
      idAlumno: '2025001',
      nombre: 'Juan',
      apellidos: 'Pérez Gómez',
      telefono1: '5512345678',
      telefono2: '5523456789',
      carrera: 'Ingeniería de Software',
      semestre: '6',
      periodo: '2025-A',
      gmail: 'juan.perez@gmail.com',
      foto: 'assets/img/profile-placeholder.png' // Foto de perfil
    };
    this.studentForm.patchValue(dummyData);
    this.studentForm.disable();
    this.studentForm.get('idAlumno')?.disable();
  }

  enableEditing() {
    this.isEditing = true;
    this.studentForm.enable();
    this.studentForm.get('idAlumno')?.disable();
  }

  cancelEditing() {
    this.isEditing = false;
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

  changeTheme(color: string) {
    document.documentElement.style.setProperty('--profile-bg-color', color);
  }
}
