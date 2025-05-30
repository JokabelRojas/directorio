import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CrearAlumnoDialogComponent } from './crear-alumno-dialog/crear-alumno-dialog.component';
import { EditarAlumnoDialogComponent } from './editar-alumno-dialog/editar-alumno-dialog.component';

interface Alumno {
  n: number;
  id: string;
  nombre: string;
  apellido: string;
  grado: string;
  dni: string;
  seccion: string;
  anioEscolar: string;
  telefonoApoderado: string;
  codigo: string;
  carrera: string;
  estado: string;
}

@Component({
  selector: 'app-gestion-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './gestion-alumnos.component.html',
  styleUrl: './gestion-alumnos.component.scss',
})
export class GestionAlumnosComponent implements OnInit {
  alumnos = signal<Alumno[]>([]);
  displayedColumns: string[] = [
    'n',
    'nombre',
    'apellido',
    'grado',
    'dni',
    'seccion',
    'anioEscolar',
    'telefonoApoderado',
    'carrera',
    'codigo',
    'estado',
    'acciones',
  ];
  dataSource = computed(() => new MatTableDataSource(this.alumnos()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarAlumnos();

    const ds = this.dataSource();
    ds.filterPredicate = (data: Alumno, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.nombre.toLowerCase().includes(lowerCaseFilter) ||
        data.apellido.toLowerCase().includes(lowerCaseFilter) ||
        data.dni.includes(lowerCaseFilter)
      );
    };
  }

  cargarAlumnos(): void {
    const alumnosLocalStorage = localStorage.getItem('alumnos');
    if (alumnosLocalStorage) {
      const alumnosData = JSON.parse(alumnosLocalStorage);
      const alumnosMapeados = alumnosData.map((alumno: any, index: number) => ({
        n: index + 1,
        id: alumno.id,
        nombre: alumno.nombres,
        apellido: alumno.apellidos,
        grado: alumno.semestre,
        dni: alumno.dni,
        seccion: alumno.email,
        anioEscolar: alumno.periodo,
        telefonoApoderado: alumno.telefono,
        codigo: alumno.codigo,
        carrera: alumno.carrera,
        estado: alumno.estado,
      }));
      this.alumnos.set(alumnosMapeados);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  editarAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(EditarAlumnoDialogComponent, {
      width: '400px',
      data: alumno,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos();
      }
    });
  }

  eliminarAlumno(alumno: Alumno): void {
    const alumnosLocalStorage = localStorage.getItem('alumnos');
    if (alumnosLocalStorage) {
      const alumnos = JSON.parse(alumnosLocalStorage);
      const alumnosActualizados = alumnos.filter(
        (a: any) => a.id !== alumno.id
      );
      localStorage.setItem('alumnos', JSON.stringify(alumnosActualizados));
      this.cargarAlumnos();
    }
  }

  abrirDialogoCrearAlumno(): void {
    const dialogRef = this.dialog.open(CrearAlumnoDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarAlumnos();
      }
    });
  }
}
