// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfesoraComponent } from './features/profesora/profesora.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { GestionAlumnosComponent } from './features/profesora/gestion-alumnos/gestion-alumnos.component';
import { GestionTablesComponent } from './features/profesora/gestion-tables/gestion-tables.component';
import { IngresoTabletComponent } from './features/profesora/ingreso-tablet/ingreso-tablet.component';
import { HistorialAsignacionComponent } from './features/profesora/historial-asignacion/historial-asignacion.component';
import { DirectoryComponent } from './features/admin/directory/directory.component';
import { PerfilComponent } from './features/admin/perfil/perfil.component';
import { VerSemestreComponent } from './features/admin/ver-semestre/ver-semestre.component';
import { NotificacionComponent } from './features/admin/notificacion/notificacion.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'directory', pathMatch: 'full' },
      { path: 'directory', component: DirectoryComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'ver-semestre', component: VerSemestreComponent },
      { path: 'notificacion', component: NotificacionComponent },
    ],
  },
  {
    path: 'profesora',
    component: ProfesoraComponent,
    canActivate: [AuthGuard],
    data: { role: 'profesora' },
    children: [
      { path: '', redirectTo: 'gestion-alumnos', pathMatch: 'full' },
      { path: 'gestion-alumnos', component: GestionAlumnosComponent },
      { path: 'gestion-tables', component: GestionTablesComponent },
      { path: 'ingreso-tablet', component: IngresoTabletComponent },
      { path: 'historial-asignacion', component: HistorialAsignacionComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
