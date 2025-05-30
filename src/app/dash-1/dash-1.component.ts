import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


interface Alumno {
  nombres: string;
  apellidos: string;
  dni: string;
  genero?: string; // Hacemos opcional el campo por si algunos registros no lo tienen
  carrera: string;
  periodo: string;
  estado: string;
  [key: string]: any; // Para propiedades adicionales
}



@Component({
  selector: 'app-dash-1',
  imports: [MatCardModule,MatIconModule],
  templateUrl: './dash-1.component.html',
  styleUrl: './dash-1.component.scss'
})
export class Dash1Component implements OnInit {

 totalAlumnos = 0;
  totalHombres = 0;
  totalMujeres = 0;

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  get porcentajeHombres(): number {
    return this.calcularPorcentaje(this.totalHombres);
  }

  get porcentajeMujeres(): number {
    return this.calcularPorcentaje(this.totalMujeres);
  }



  private calcularPorcentaje(valor: number): number {
    return this.totalAlumnos > 0 
      ? Math.round((valor / this.totalAlumnos) * 100) 
      : 0;
  }

  private cargarEstadisticas(): void {
    const alumnosJSON = localStorage.getItem('alumnos');
    if (alumnosJSON) {
      const alumnos: Alumno[] = JSON.parse(alumnosJSON);
      
      this.totalAlumnos = alumnos.length;
      this.totalHombres = alumnos.filter(a => a.genero === 'M').length;
      this.totalMujeres = alumnos.filter(a => a.genero === 'F').length;
    }
  }

  actualizarEstadisticas(): void {
    this.cargarEstadisticas();
  }
}
