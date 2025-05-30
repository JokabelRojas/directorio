import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CrearIngresoDialogComponent } from './crear-ingreso-dialog/crear-ingreso-dialog.component';

interface Periodo {
  id: number;
  nombre: string;
  estado: 'activo' | 'porComenzar' | 'finalizado';
  fechaCreacion: string;
}

@Component({
  selector: 'app-ingreso-tablet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './ingreso-tablet.component.html',
  styleUrls: ['./ingreso-tablet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngresoTabletComponent implements OnInit {
  periodos: Periodo[] = [];
  periodosFiltrados: Periodo[] = [];
  periodoFiltro: string = '';
  periodoSeleccionado: string = '';
  displayedColumns: string[] = ['nombre', 'estado', 'acciones']; // Ajustado para coincidir con el HTML

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarPeriodos();
    this.periodosFiltrados = [...this.periodos];
  }

  cargarPeriodos(): void {
    const periodosGuardados = localStorage.getItem('periodos');
    this.periodos = periodosGuardados ? JSON.parse(periodosGuardados) : [];
    this.periodosFiltrados = [...this.periodos];
  }

  guardarPeriodos(): void {
    localStorage.setItem('periodos', JSON.stringify(this.periodos));
  }

  filtrarPeriodos(): void {
    const filtro = this.periodoFiltro.toLowerCase();
    this.periodosFiltrados = this.periodos.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.estado.toLowerCase().includes(filtro)
    );
  }

  abrirDialogoCrearPeriodo(): void {
    const dialogRef = this.dialog.open(CrearIngresoDialogComponent, {
      width: '600px',
      data: { 
        id: Date.now(),
        nombre: '',
        estado: 'porComenzar',
        fechaCreacion: new Date().toISOString()
      }
    });

    dialogRef.afterClosed().subscribe((result: Periodo) => {
      if (result) {
        this.periodos.push(result);
        this.guardarPeriodos();
        this.filtrarPeriodos();
      }
    });
  }

  abrirDialogoEditarPeriodo(periodo: Periodo): void {
    const dialogRef = this.dialog.open(CrearIngresoDialogComponent, {
      width: '600px',
      data: { ...periodo }
    });

    dialogRef.afterClosed().subscribe((result: Periodo) => {
      if (result) {
        const index = this.periodos.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.periodos[index] = result;
          this.guardarPeriodos();
          this.filtrarPeriodos();
        }
      }
    });
  }

  eliminarPeriodo(periodo: Periodo): void {
    if (confirm(`¿Estás seguro de eliminar el período ${periodo.nombre}?`)) {
      this.periodos = this.periodos.filter(p => p.id !== periodo.id);
      this.guardarPeriodos();
      this.filtrarPeriodos();
    }
  }

  get periodosActivos(): number {
    return this.periodos.filter(p => p.estado === 'activo').length;
  }

  get periodosPorComenzar(): number {
    return this.periodos.filter(p => p.estado === 'porComenzar').length;
  }

  get periodosFinalizados(): number {
    return this.periodos.filter(p => p.estado === 'finalizado').length;
  }
}