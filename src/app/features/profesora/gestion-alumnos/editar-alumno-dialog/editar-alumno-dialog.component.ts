import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

interface Alumno {
  n: number;
  nombre: string;
  apellido: string;
  grado: string;
  dni: string;
  seccion: string;
  anioEscolar: string; // Cambio a string para las opciones de periodo
  telefonoApoderado: string;
}

@Component({
  selector: 'app-editar-alumno-dialog',
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
  templateUrl: './editar-alumno-dialog.component.html',
  styleUrls: ['./editar-alumno-dialog.component.scss'],
})
export class EditarAlumnoDialogComponent {
  alumno: Alumno;
  aniosEscolares = [
    '2023-I',
    '2023-II',
    '2024-I',
    '2024-II',
    '2025-I',
    '2025-II',
  ];

  constructor(
    public dialogRef: MatDialogRef<EditarAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {
    this.alumno = { ...data }; // Crear una copia para no modificar el original directamente
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.alumno);
  }
}
