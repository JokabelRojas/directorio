import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Tablet {
  n: number;
  codigo: string;
  marca: string;
  modelo: string;
  grado: string;
  observacion: string;
  estado: string;
  fecha: Date;
}

interface EstadoRevision {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-tablet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './crear-tablet-dialog.component.html',
  styleUrl: './crear-tablet-dialog.component.scss',
})
export class CrearTabletDialogComponent {
  carrera = {
    estudiante: '',
    carrera: '',
    estado: '',
    fecha: new Date(),
  };

  carreras: string[] = [
    'Administración',
    'Ingeniería de Software',
    'Mecánica',
    'Diseño Gráfico',
  ];

  estados: EstadoRevision[] = [
    { value: 'Aprobado', viewValue: 'Aprobado' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Rechazado', viewValue: 'Rechazado' },
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearTabletDialogComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    const nuevaCarrera: Tablet = {
      n: 0, // Se sobrescribe en el padre
      codigo: this.carrera.estudiante,
      marca: this.carrera.carrera,
      modelo: '',
      grado: '',
      observacion: '',
      estado: this.carrera.estado,
      fecha: this.carrera.fecha
    };

    this.dialogRef.close(nuevaCarrera);
  }
}
