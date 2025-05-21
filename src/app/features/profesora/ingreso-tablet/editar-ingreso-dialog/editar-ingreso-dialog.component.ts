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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface EstadoAsignacion {
  value: string;
  viewValue: string;
}

interface HistorialAsignacion {
  n: number;
  tablet: string;
  usuario: string;
  fechaAsignacion: Date;
  fechaDevolucion: Date | null;
  observacion: string;
  estado: string;
}

@Component({
  selector: 'app-editar-ingreso-dialog',
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
  templateUrl: './editar-ingreso-dialog.component.html',
  styleUrl: './editar-ingreso-dialog.component.scss',
})
export class EditarIngresoDialogComponent {
  ingreso: HistorialAsignacion;

  estados: EstadoAsignacion[] = [
    { value: 'asignado', viewValue: 'Asignado' },
    { value: 'devuelto', viewValue: 'Devuelto' },
    { value: 'pendiente', viewValue: 'Pendiente' },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditarIngresoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistorialAsignacion
  ) {
    this.ingreso = { ...data };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.ingreso);
  }
}