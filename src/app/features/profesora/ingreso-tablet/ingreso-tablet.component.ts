import { ChangeDetectionStrategy, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

interface Periodo {
  nombre: string;
  estado: 'activo' | 'porComenzar' | 'finalizado';
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
    MatChipsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ingreso-tablet.component.html',
  styleUrls: ['./ingreso-tablet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngresoTabletComponent implements OnInit {
  periodos: Periodo[] = [
    { nombre: '2023 - I - Administración', estado: 'activo' },
    { nombre: '2023 - II - Administración', estado: 'finalizado' },
    { nombre: '2024 - I - Ingeniería de Software', estado: 'porComenzar' },
    { nombre: '2024 - II - Ingeniería de Software', estado: 'activo' },
    { nombre: '2024 - I - Mecánica', estado: 'finalizado' },
    { nombre: '2024 - II - Mecánica', estado: 'porComenzar' },
    { nombre: '2025 - I - Diseño Gráfico', estado: 'activo' },
    { nombre: '2025 - II - Diseño Gráfico', estado: 'porComenzar' }
  ];

  periodoFiltro: string = '';
  periodosFiltrados: Periodo[] = [];
  periodoSeleccionado: string = '';
  nuevoNombre: string = '';
  nuevoEstado: 'activo' | 'porComenzar' | 'finalizado' = 'activo';
  mostrarFormulario: boolean = false;

  // Definir las columnas que se van a mostrar en la tabla
  displayedColumns: string[] = ['nombre', 'estado', 'acciones'];

  ngOnInit(): void {
    this.periodosFiltrados = this.periodos; // Inicialmente muestra todos
  }

  filtrarPeriodos() {
    const filtro = this.periodoFiltro.toLowerCase();
    this.periodosFiltrados = this.periodos.filter(p =>
      p.nombre.toLowerCase().includes(filtro)
    );
  }

  seleccionarPeriodo(nombre: string) {
    this.periodoSeleccionado = nombre;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearPeriodo() {
    if (this.nuevoNombre.trim()) {
      this.periodos.push({
        nombre: this.nuevoNombre.trim(),
        estado: this.nuevoEstado
      });

      // Limpiar campos después de crear
      this.nuevoNombre = '';
      this.nuevoEstado = 'activo';
      this.mostrarFormulario = false;
    }
  }

  editarPeriodo(periodo: Periodo) {
    this.nuevoNombre = periodo.nombre;
    this.nuevoEstado = periodo.estado;
    this.mostrarFormulario = true;
  }

  eliminarPeriodo(periodo: Periodo) {
    const index = this.periodos.indexOf(periodo);
    if (index !== -1) {
      this.periodos.splice(index, 1);
    }
  }

  get periodosActivos() {
    return this.periodos.filter(p => p.estado === 'activo').length;
  }

  get periodosPorComenzar() {
    return this.periodos.filter(p => p.estado === 'porComenzar').length;
  }

  get periodosFinalizados() {
    return this.periodos.filter(p => p.estado === 'finalizado').length;
  }
}
