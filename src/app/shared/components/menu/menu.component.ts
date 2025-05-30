import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { MatBadgeModule } from '@angular/material/badge';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  notificationCount?: number;
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
    MatTooltipModule,
    MatBadgeModule
  ],
  template: `
    <div class="profile-section" [class.collapsed]="collapsed">
      <div class="profile-image-container">
        <img
          [src]="profileImage()"
          alt="perfil"
          class="profile-image"
          [style.width.px]="profileImageSize()"
          [style.height.px]="profileImageSize()"
        />
        <div class="profile-role-badge">{{ profileRole() }}</div>
      </div>
      <h3 class="user-name" [class.collapsed]="collapsed">{{ profileName() }}</h3>
      <p class="email" [class.collapsed]="collapsed">{{ profileEmail() }}</p>
    </div>

    <mat-nav-list class="menu-list">
      <ng-container *ngFor="let item of filteredMenuItems(); trackBy: trackByFn">
        <a 
          class="menu-item" 
          [routerLink]="item.route" 
          routerLinkActive="active-link"
          [matTooltip]="collapsed ? item.label : null"
          matTooltipPosition="right"
        >
          <mat-list-item [activated]="isActiveRoute(item.route)">
            <mat-icon matListItemIcon>
              @if (item.notificationCount && item.notificationCount > 0) {
                <mat-badge [matBadge]="item.notificationCount" matBadgeColor="warn" matBadgeSize="small">
                  {{ item.icon }}
                </mat-badge>
              } @else {
                {{ item.icon }}
              }
            </mat-icon>
            <span [class.collapsed]="collapsed">{{ item.label }}</span>
          </mat-list-item>
        </a>
      </ng-container>
    </mat-nav-list>

    <div class="logout-section" [class.collapsed]="collapsed">
      <button 
        mat-button 
        class="logout-button" 
        (click)="logout()"
        [matTooltip]="collapsed ? 'Cerrar sesión' : null"
        matTooltipPosition="right"
      >
        <mat-icon>logout</mat-icon>
        <span [class.collapsed]="collapsed">Cerrar sesión</span>
      </button>
    </div>
  `,
  styles: [`
:host {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #2c3e50 0%, #1a2933 100%);
  color: white;
  transition: width 0.3s ease;
  width: 240px; /* Ancho normal */
}

    .profile-section {
      text-align: center;
      padding: 20px 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .profile-image-container {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      position: relative;
    }

    .profile-image {
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #3498db;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .profile-role-badge {
      position: absolute;
      bottom: -5px;
      right: calc(50% - 25px);
      background: #3498db;
      color: white;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: bold;
      white-space: nowrap;
    }

    .user-name {
      margin: 10px 0 5px;
      font-weight: 600;
      font-size: 16px;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .email {
      margin: 0;
      font-size: 12px;
      color: #bdc3c7;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .menu-list {
  flex: 1;
  padding: 10px 0;
}

.menu-item {
  display: block;
  color: inherit;
  text-decoration: none;
  
  mat-list-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    
    mat-icon {
      margin-right: 16px;
      color: #3498db;
      flex-shrink: 0;
    }
  }
}

.active-link {
  background: rgba(52, 152, 219, 0.2);
  border-left: 3px solid #3498db;
  
  mat-icon {
    color: white !important;
  }
}

.logout-section {
  padding: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-button {
  width: 100%;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 12px 16px;
  
  mat-icon {
    margin-right: 16px;
  }
}

    /* Collapsed state */
    .collapsed {
      display: none;
    }

:host.collapsed {
  width: 60px !important;
  
  .profile-section {
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .profile-image {
      width: 36px !important;
      height: 36px !important;
      margin: 0 auto;
    }
  }

  .menu-item mat-list-item,
  .logout-button {
    justify-content: center !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    
    mat-icon {
      margin: 0 !important;
    }
    
    span {
      display: none;
    }
  }
}


    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  `]
})
export class MenuComponent {
  @Input() collapsed = false;

  profesoraMenuItems = signal<MenuItem[]>([
    { icon: 'home', label: 'Dashboard', route: 'dashboard', notificationCount: 1 },
    { icon: 'person', label: 'Gestión Estudiantes', route: 'gestion-alumnos', notificationCount: 3 },
    // { icon: 'check_circle', label: 'Estados', route: 'gestion-tables' },
    { icon: 'event', label: 'Periodos', route: 'ingreso-tablet', notificationCount: 1 },
    { icon: 'history', label: 'Reporte', route: 'historial-asignacion' },
  ]);

  adminMenuItems = signal<MenuItem[]>([
    { icon: 'people', label: 'Directorio', route: 'directory' },
    { icon: 'tablet_mac', label: 'Perfil', route: 'perfil' },
    { icon: 'download', label: 'Ver Semestre', route: 'ver-semestre', notificationCount: 5 },
    { icon: 'notifications', label: 'Notificaciones', route: 'notificacion' },
  ]);

  // Imágenes de perfil según rol
  profileImage = computed(() => {
    const role = this.roleService.getRole();
    if (role === 'profesora') return 'https://randomuser.me/api/portraits/men/32.jpg';
    if (role === 'admin') return 'https://randomuser.me/api/portraits/women/44.jpg';
    return 'https://cdn-icons-png.flaticon.com/512/147/147144.png';
  });

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
    return 'Invitado';
  });

  profileEmail = computed(() => {
    const role = this.roleService.getRole();
    if (role === 'profesora') return 'jhonatan123@gmail.com';
    if (role === 'admin') return 'jokabelrojas@gmail.com';
    return 'invitado@ejemplo.com';
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