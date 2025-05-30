import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Alumno {
  periodo: string;
  [key: string]: any;
}
@Component({
  selector: 'app-dash-2',
  imports: [CommonModule,KeyValuePipe],
  templateUrl: './dash-2.component.html',
  styleUrl: './dash-2.component.scss'
})
export class Dash2Component implements OnInit {

periodosArray: { periodo: string, cantidad: number, porcentaje: number }[] = [];
  totalEstudiantes = 0;

  ngOnInit(): void {
    this.calcularEstadisticas();
  }

  private calcularEstadisticas(): void {
    const alumnosJSON = localStorage.getItem('alumnos');
    if (!alumnosJSON) return;

    const alumnos: any[] = JSON.parse(alumnosJSON);
    this.totalEstudiantes = alumnos.length;

    // Agrupar por período
    const periodosMap = new Map<string, number>();
    
    alumnos.forEach(alumno => {
      if (alumno.periodo) {
        periodosMap.set(alumno.periodo, (periodosMap.get(alumno.periodo) || 0) + 1);
      }
    });

    // Convertir a array y calcular porcentajes
    this.periodosArray = Array.from(periodosMap.entries()).map(([periodo, cantidad]) => ({
      periodo,
      cantidad,
      porcentaje: this.totalEstudiantes > 0 ? Math.round((cantidad / this.totalEstudiantes) * 100) : 0
    }));

    // Ordenar alfabéticamente por período
    this.periodosArray.sort((a, b) => a.periodo.localeCompare(b.periodo));
  }

  actualizarDatos(): void {
    this.calcularEstadisticas();
  }

}
