import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Alumno {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento?: string;
  genero: string;
  carrera: string;
  periodo: string;
  semestre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  estado: string;
  codigo: string;
  fechaCreacion: Date;
}

interface Periodo {
  id: number;
  nombre: string;
  estado: string;
  fechaCreacion: string;
}

@Component({
  selector: 'app-crear-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-alumno-dialog.component.html',
  styleUrls: ['./crear-alumno-dialog.component.scss']
})
export class CrearAlumnoDialogComponent implements OnInit {
  carreras = [
    { id: 'IS', nombre: 'Ingeniería de Software' },
    { id: 'DG', nombre: 'Diseño Gráfico' },
    { id: 'AE', nombre: 'Administración de Empresas' }
  ];

  periodosAcademicos: Periodo[] = []; // Periodos cargados desde localStorage
  semestres = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  alumno: Partial<Alumno> = {
    genero: 'M',
    semestre: 'I',
    estado: 'activo',
    fechaCreacion: new Date()
  };

  constructor(
    public dialogRef: MatDialogRef<CrearAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cargarPeriodos();
  }

  cargarPeriodos(): void {
    const periodosStr = localStorage.getItem('periodos');
    if (periodosStr) {
      try {
        const periodosData: Periodo[] = JSON.parse(periodosStr);
        this.periodosAcademicos = periodosData.map(p => ({
          id: p.id,
          nombre: p.nombre,
          estado: p.estado,
          fechaCreacion: p.fechaCreacion
        }));
      } catch (error) {
        console.error('Error al parsear periodos:', error);
      }
    } else {
      console.warn('No se encontraron periodos en localStorage');
    }
  }

  crearAlumno(): void {
    if (!this.alumnoFormValido()) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    this.alumno.id = this.generarId();
    this.alumno.codigo = this.generarCodigo();
    this.guardarAlumno();
    this.dialogRef.close(true);
  }

  private alumnoFormValido(): boolean {
    return !!(
      this.alumno.nombres &&
      this.alumno.apellidos &&
      this.alumno.dni &&
      this.alumno.carrera &&
      this.alumno.periodo &&
      this.alumno.email
    );
  }

  private generarId(): string {
    return 'ALU-' + Date.now().toString();
  }

  private generarCodigo(): string {
    const carrera = this.carreras.find(c => c.id === this.alumno.carrera);
    const prefix = carrera ? carrera.id : 'AL';
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${year}-${randomNum}`;
  }

  private guardarAlumno(): void {
    const alumnosStr = localStorage.getItem('alumnos');
    const alumnos: Alumno[] = alumnosStr ? JSON.parse(alumnosStr) : [];
    alumnos.push(this.alumno as Alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}