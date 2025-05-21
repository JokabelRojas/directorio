import { Component, OnInit, signal, computed, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

interface HistorialAsignacion {
  n: number;
  estudiante: string;
  semestre: string;
  estado: 'Aprobado' | 'Desaprobado';
  periodo: string;
}

@Component({
  selector: 'app-historial-asignacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './historial-asignacion.component.html',
  styleUrls: ['./historial-asignacion.component.scss'],
})
export class HistorialAsignacionComponent implements OnInit {
  historial = signal<HistorialAsignacion[]>([]);
  displayedColumns: string[] = ['n', 'estudiante', 'semestre', 'estado', 'periodo', 'acciones'];
  dataSource = computed(() => new MatTableDataSource(this.historial()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);

  ngOnInit(): void {
    const ds = this.dataSource();
    ds.filterPredicate = (data: HistorialAsignacion, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return data.estudiante.toLowerCase().includes(lowerCaseFilter) ||
             data.semestre.toLowerCase().includes(lowerCaseFilter) ||
             data.estado.toLowerCase().includes(lowerCaseFilter) ||
             data.periodo.toLowerCase().includes(lowerCaseFilter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  editarHistorial(asignacion: HistorialAsignacion): void {
    const dialogRef = this.dialog.open(EditarHistorialDialogComponent, {
      width: '400px',
      data: asignacion,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historial.update(current =>
          current.map(a => (a.n === result.n ? result : a))
        );
      }
    });
  }

  eliminarHistorial(asignacion: HistorialAsignacion): void {
    this.historial.update(current =>
      current.filter(a => a.n !== asignacion.n)
    );
  }

  abrirDialogoCrearHistorial(): void {
    const dialogRef = this.dialog.open(CrearHistorialDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historial.update(current => {
          const newId = current.length > 0 ? Math.max(...current.map(a => a.n)) + 1 : 1;
          return [...current, { ...result, n: newId }];
        });
      }
    });
  }
}

@Component({
  selector: 'app-crear-historial-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h1 mat-dialog-title>Crear Historial</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Estudiante</mat-label>
        <input matInput [(ngModel)]="historial.estudiante">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Semestre</mat-label>
        <mat-select [(ngModel)]="historial.semestre">
          <mat-option value="I">I</mat-option>
          <mat-option value="II">II</mat-option>
          <mat-option value="III">III</mat-option>
          <mat-option value="IV">IV</mat-option>
          <mat-option value="V">V</mat-option>
          <mat-option value="VI">VI</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Estado</mat-label>
        <mat-select [(ngModel)]="historial.estado">
          <mat-option value="Aprobado">Aprobado</mat-option>
          <mat-option value="Desaprobado">Desaprobado</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Periodo</mat-label>
        <mat-select [(ngModel)]="historial.periodo">
          <mat-option value="2023-I">2023-I</mat-option>
          <mat-option value="2023-II">2023-II</mat-option>
          <mat-option value="2024-I">2024-I</mat-option>
          <mat-option value="2024-II">2024-II</mat-option>
          <mat-option value="2025-I">2025-I</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-button (click)="guardar()">Guardar</button>
    </div>
  `,
})
export class CrearHistorialDialogComponent {
  historial: any = {
    estudiante: '',
    semestre: '',
    estado: 'Aprobado',
    periodo: ''
  };

  constructor(public dialogRef: MatDialogRef<CrearHistorialDialogComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.historial);
  }
}

@Component({
  selector: 'app-editar-historial-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h1 mat-dialog-title>Editar Historial</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Estudiante</mat-label>
        <input matInput [(ngModel)]="historial.estudiante">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Semestre</mat-label>
        <mat-select [(ngModel)]="historial.semestre">
          <mat-option value="I">I</mat-option>
          <mat-option value="II">II</mat-option>
          <mat-option value="III">III</mat-option>
          <mat-option value="IV">IV</mat-option>
          <mat-option value="V">V</mat-option>
          <mat-option value="VI">VI</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Estado</mat-label>
        <mat-select [(ngModel)]="historial.estado">
          <mat-option value="Aprobado">Aprobado</mat-option>
          <mat-option value="Desaprobado">Desaprobado</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Periodo</mat-label>
        <mat-select [(ngModel)]="historial.periodo">
          <mat-option value="2023-I">2023-I</mat-option>
          <mat-option value="2023-II">2023-II</mat-option>
          <mat-option value="2024-I">2024-I</mat-option>
          <mat-option value="2024-II">2024-II</mat-option>
          <mat-option value="2025-I">2025-I</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-button (click)="guardar()">Guardar</button>
    </div>
  `,
})
export class EditarHistorialDialogComponent {
  historial: any;

  constructor(
    public dialogRef: MatDialogRef<EditarHistorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.historial = { ...data };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.historial);
  }
}
