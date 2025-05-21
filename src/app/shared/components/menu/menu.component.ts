import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  template: `
    <div class="profile-section" [class.collapsed]="collapsed">
      <div class="profile-image-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="perfil"
          class="profile-image"
          [style.width.px]="profileImageSize()"
          [style.height.px]="profileImageSize()"
        />
      </div>
      <h3 class="user-name" [class.collapsed]="collapsed">{{ profileName() }}</h3>
      <p class="email" [class.collapsed]="collapsed">{{ profileEmail() }}</p>
    </div>

    <mat-nav-list class="menu-list">
      <ng-container *ngFor="let item of filteredMenuItems(); trackBy: trackByFn">
        <a class="menu-item" [routerLink]="item.route" routerLinkActive="active-link">
          <mat-list-item [activated]="isActiveRoute(item.route)">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span [class.collapsed]="collapsed">{{ item.label }}</span>
          </mat-list-item>
        </a>
      </ng-container>
    </mat-nav-list>

    <div class="logout-section" [class.collapsed]="collapsed">
      <button mat-button class="logout-button" (click)="logout()">
        <mat-icon>logout</mat-icon>
        <span [class.collapsed]="collapsed">Cerrar sesión</span>
      </button>
    </div>
  `,
  styles: [`
    .profile-section {
      text-align: center;
      padding: 20px;
    }
  
    .profile-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  
    .profile-image {
      border-radius: 50%;
      object-fit: cover;
    }
  
    .user-name {
      margin: 0;
      font-weight: bold;
      font-size: 18px;
      color: #1976d2; /* Azul bonito */
    }
  
    .email {
      margin: 0;
      font-size: 14px;
      color: #555;
    }
  
    .menu-list {
      margin-top: 20px;
    }
  
    .menu-item {
      text-decoration: none;
      color: inherit;
    }
  
    .active-link mat-list-item { /* Azul clarito cuando esté activo */
      border-radius: 8px;
    }
  
    .logout-section {
      text-align: center;
      margin-top: 20px;
    }
  
    .logout-button {
      color: #d32f2f; /* Rojo */
    }
  
    /* Opcional: cuando esté colapsado */
    .collapsed {
      display: none;
    }
  `]
})
export class MenuComponent {
  @Input() collapsed = false;

  profesoraMenuItems = signal<MenuItem[]>([
    { icon: 'person', label: 'Gestión Estudiantes', route: 'gestion-alumnos' },
    { icon: 'check_circle', label: 'Estados', route: 'gestion-tables' },
    { icon: 'event', label: 'Periodos', route: 'ingreso-tablet' },
    { icon: 'history', label: 'Reporte', route: 'historial-asignacion' },
  ]);

  adminMenuItems = signal<MenuItem[]>([
    { icon: 'person', label: 'Directorio', route: 'directory' },
    { icon: 'tablet_mac', label: 'Perfil', route: 'perfil' },
    { icon: 'download', label: 'Ver Semestre', route: 'ver-semestre' },
    { icon: 'history', label: 'Notificaciones', route: 'notificacion' },
  ]);

  filteredMenuItems = computed(() => {
    const role = this.roleService.getRole();
    switch (role) {
      case 'profesora':
        return this.profesoraMenuItems();
      case 'admin':
        return this.adminMenuItems();
      default:
        return [];
    }
  });

  profileRole = computed(() => {
    const role = this.roleService.getRole();
    if (role === 'profesora') return 'Profesora';
    if (role === 'admin') return 'Administrador';
    return 'Invitado';
  });

  profileName = computed(() => {
    const role = this.roleService.getRole();
    if (role === 'profesora') return 'Jhonatan Sauñe';
    if (role === 'admin') return 'Jokabel Rojas';
    return '';
  });

  profileEmail = computed(() => {
    const role = this.roleService.getRole();
    if (role === 'profesora') return 'jhonatan123@gmail.com';
    if (role === 'admin') return 'jokabelrojas@gmail.com';
    return '';
  });

  profileImageSize = computed(() => (this.collapsed ? 40 : 80));

  constructor(private router: Router, private roleService: RoleService) {}

  isActiveRoute(route: string): boolean {
    return this.router.isActive(`/${route}`, true);
  }

  logout(): void {
    this.roleService.setRole('');
    this.router.navigate(['/login']);
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.route;
  }
}
