import { ChangeDetectionStrategy, Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CrearTabletDialogComponent } from './crear-tablet-dialog/crear-tablet-dialog.component';
import { EditarTabletDialogComponent } from './editar-tablet-dialog/editar-tablet-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

interface Tablet {
  n: number;
  codigo: string;       // Nombre del estudiante
  marca: string;        // Carrera
  modelo: string;
  grado: string;
  observacion: string;
  estado: string;
  fecha: Date;
}

@Component({
  selector: 'app-gestion-tables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CrearTabletDialogComponent,
    EditarTabletDialogComponent,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './gestion-tables.component.html',
  styleUrl: './gestion-tables.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionTablesComponent implements OnInit {
  tablets = signal<Tablet[]>([]);
  displayedColumns: string[] = ['n', 'codigo', 'marca', 'modelo', 'grado', 'estado', 'acciones'];
  dataSource = computed(() => new MatTableDataSource(this.tablets()));
  searchTerm = signal<string>('');
  dialog = inject(MatDialog);
  nextId = 1;

  totalCarreras = computed(() => this.tablets().length);
  totalAprobados = computed(() => this.tablets().filter(t => t.estado === 'Aprobado').length);
  totalPendientes = computed(() => this.tablets().filter(t => t.estado === 'Pendiente').length);

  ngOnInit(): void {
    const ds = this.dataSource();
    ds.filterPredicate = (data: Tablet, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return data.codigo.toLowerCase().includes(lowerCaseFilter) ||
             data.marca.toLowerCase().includes(lowerCaseFilter) ||
             data.modelo.toLowerCase().includes(lowerCaseFilter) ||
             data.grado?.toLowerCase().includes(lowerCaseFilter) ||
             data.observacion?.toLowerCase().includes(lowerCaseFilter) ||
             data.estado.toLowerCase().includes(lowerCaseFilter);
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  agregarTablet(): void {
    const dialogRef = this.dialog.open(CrearTabletDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablets.update(current => [...current, { ...result, n: this.nextId++ }]);
      }
    });
  }

  editarTablet(tablet: Tablet): void {
    const dialogRef = this.dialog.open(EditarTabletDialogComponent, {
      width: '500px',
      data: tablet,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablets.update(current =>
          current.map(t => (t.n === result.n ? result : t))
        );
      }
    });
  }

  eliminarTablet(tablet: Tablet): void {
    this.tablets.update(current => current.filter(t => t.n !== tablet.n));
  }
}
