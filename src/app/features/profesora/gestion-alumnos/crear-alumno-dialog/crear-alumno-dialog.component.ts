import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crear-alumno-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './crear-alumno-dialog.component.html',
  styleUrls: ['./crear-alumno-dialog.component.scss'],
})
export class CrearAlumnoDialogComponent {
  alumno = {
    nombre: '',
    apellido: '',
    grado: '',
    dni: '',
    seccion: '',
    anioEscolar: '', // Ahora con selección
    telefonoApoderado: '',
  };

  aniosEscolares = [
    '2023-I',
    '2023-II',
    '2024-I',
    '2024-II',
    '2025-I',
    '2025-II',
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearAlumnoDialogComponent>
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const periodo = currentMonth <= 6 ? 'I' : 'II';
    this.alumno.anioEscolar = `${currentYear}-${periodo}`;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close(this.alumno);
  }
}
