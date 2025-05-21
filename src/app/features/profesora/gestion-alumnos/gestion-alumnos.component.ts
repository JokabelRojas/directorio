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
  nombre: string;
  apellido: string;
  grado: string;
  dni: string;
  seccion: string;
  anioEscolar: number;
  telefonoApoderado: string;
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
    CrearAlumnoDialogComponent,
    EditarAlumnoDialogComponent,
  ],
  templateUrl: './gestion-alumnos.component.html',
  styleUrl: './gestion-alumnos.component.scss'
})
export class GestionAlumnosComponent implements OnInit {
  alumnos = signal<Alumno[]>([]);
  displayedColumns: string[] = ['n', 'nombre', 'apellido', 'grado', 'dni', 'seccion', 'anioEscolar', 'telefonoApoderado', 'acciones'];
  dataSource = computed(() => new MatTableDataSource(this.alumnos()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);
  nextId = 1;

  ngOnInit(): void {
    const ds = this.dataSource();
    ds.filterPredicate = (data: Alumno, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return data.nombre.toLowerCase().includes(lowerCaseFilter) ||
             data.apellido.toLowerCase().includes(lowerCaseFilter) ||
             data.dni.includes(lowerCaseFilter);
    };
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnos.update(currentAlumnos =>
          currentAlumnos.map(a => (a.n === result.n ? result : a))
        );
      }
    });
  }

  eliminarAlumno(alumno: Alumno): void {
    this.alumnos.update(currentAlumnos => currentAlumnos.filter(a => a.n !== alumno.n));
  }

  abrirDialogoCrearAlumno(): void {
    const dialogRef = this.dialog.open(CrearAlumnoDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alumnos.update(currentAlumnos => {
          const newId = currentAlumnos.length > 0 ? Math.max(...currentAlumnos.map(a => a.n)) + 1 : 1;
          return [...currentAlumnos, { ...result, n: newId }];
        });
      }
    });
  }
}