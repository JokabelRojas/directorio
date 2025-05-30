import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dash-3',
  imports: [CommonModule],
  templateUrl: './dash-3.component.html',
  styleUrl: './dash-3.component.scss'
})
export class Dash3Component {
  carrerasArray: { codigo: string, nombre: string, cantidad: number, porcentaje: number }[] = [];
  totalEstudiantes = 0;
  carrerasMap = [
    { codigo: 'IS', nombre: 'Ingeniería de Software' },
    { codigo: 'DG', nombre: 'Diseño Gráfico' },
    { codigo: 'AE', nombre: 'Administración de Empresas' }
  ];

  ngOnInit(): void {
    this.calcularEstadisticas();
  }

  private calcularEstadisticas(): void {
    const alumnosJSON = localStorage.getItem('alumnos');
    if (!alumnosJSON) return;

    const alumnos: any[] = JSON.parse(alumnosJSON);
    this.totalEstudiantes = alumnos.length;

    // Agrupar por carrera
    const carrerasCount = new Map<string, number>();
    
    alumnos.forEach(alumno => {
      if (alumno.carrera) {
        carrerasCount.set(alumno.carrera, (carrerasCount.get(alumno.carrera) || 0) + 1);
      }
    });

    // Mapear a array con nombres completos
    this.carrerasArray = this.carrerasMap.map(carrera => {
      const cantidad = carrerasCount.get(carrera.codigo) || 0;
      return {
        codigo: carrera.codigo,
        nombre: carrera.nombre,
        cantidad: cantidad,
        porcentaje: this.totalEstudiantes > 0 ? Math.round((cantidad / this.totalEstudiantes) * 100) : 0
      };
    });

    // Ordenar por cantidad (descendente)
    this.carrerasArray.sort((a, b) => b.cantidad - a.cantidad);
  }

  actualizarDatos(): void {
    this.calcularEstadisticas();
  }

}
