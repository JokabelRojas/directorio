import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Periodo {
  id: number;
  nombre: string;
  estado: string;
  fechaCreacion: string;
}

@Component({
  selector: 'app-crear-ingreso-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './crear-ingreso-dialog.component.html',
  styleUrl: './crear-ingreso-dialog.component.scss',
})
export class CrearIngresoDialogComponent {
  nuevoNombre: string = '';
  nuevoEstado: string = 'porComenzar'; // Valor por defecto
  mostrarFormulario: boolean = true; // Puedes ajustar esto según tu lógica de visualización

  crearPeriodo(): void {
    if (!this.nuevoNombre || !this.nuevoEstado) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const periodosGuardados: Periodo[] = JSON.parse(localStorage.getItem('periodos') || '[]');
    
    const nuevoPeriodo: Periodo = {
      id: this.generarIdUnico(periodosGuardados),
      nombre: this.nuevoNombre,
      estado: this.nuevoEstado,
      fechaCreacion: new Date().toISOString()
    };

    periodosGuardados.push(nuevoPeriodo);

    localStorage.setItem('periodos', JSON.stringify(periodosGuardados));

    alert('Período creado exitosamente!');

    this.resetearFormulario();
  }

  private generarIdUnico(periodos: Periodo[]): number {
    if (periodos.length === 0) return 1;
    const maxId = Math.max(...periodos.map(p => p.id));
    return maxId + 1;
  }

  private resetearFormulario(): void {
    this.nuevoNombre = '';
    this.nuevoEstado = 'porComenzar';
  }

  static obtenerPeriodos(): Periodo[] {
    return JSON.parse(localStorage.getItem('periodos') || '[]');
  }
}