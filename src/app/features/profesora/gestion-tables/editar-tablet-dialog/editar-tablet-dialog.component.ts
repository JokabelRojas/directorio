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
import { provideNativeDateAdapter } from '@angular/material/core';

interface EstadoTablet {
  value: string;
  viewValue: string;
}

interface Tablet {
  n: number;
  codigo: string;     // Aquí vamos a guardar el nombre del estudiante
  marca: string;      // Aquí vamos a guardar la carrera
  modelo: string;
  grado: string;
  observacion: string;
  estado: string;
  fecha: Date;
}

@Component({
  selector: 'app-editar-tablet-dialog',
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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './editar-tablet-dialog.component.html',
  styleUrls: ['./editar-tablet-dialog.component.scss'],
})
export class EditarTabletDialogComponent {
  tablet: Tablet;

  estados: EstadoTablet[] = [
    { value: 'Aprobado', viewValue: 'Aprobado' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Rechazado', viewValue: 'Rechazado' },
  ];

  carreras: string[] = [
    'Administración',
    'Ingeniería de Software',
    'Mecánica',
    'Diseño Gráfico'
  ];

  constructor(
    public dialogRef: MatDialogRef<EditarTabletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tablet
  ) {
    this.tablet = { ...data };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.tablet);
  }
}
