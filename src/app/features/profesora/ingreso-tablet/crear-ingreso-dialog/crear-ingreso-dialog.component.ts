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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface EstadoAsignacion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crear-ingreso-dialog',
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
  templateUrl: './crear-ingreso-dialog.component.html',
  styleUrl: './crear-ingreso-dialog.component.scss',
})
export class CrearIngresoDialogComponent {
  ingreso = {
    tablet: '',
    usuario: '',
    fechaAsignacion: new Date(),
    fechaDevolucion: null,
    observacion: '',
    estado: '',
  };

  estados: EstadoAsignacion[] = [
    { value: 'asignado', viewValue: 'Asignado' },
    { value: 'devuelto', viewValue: 'Devuelto' },
    { value: 'pendiente', viewValue: 'Pendiente' },
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearIngresoDialogComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.dialogRef.close(this.ingreso);
  }
}