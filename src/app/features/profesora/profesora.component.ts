// src/app/pages/profesora/profesora.component.ts
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';

@Component({
  selector: 'app-profesora',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MenuComponent
  ],
  template: `
    <mat-toolbar class="">
      <button mat-icon-button (click)="collapsed.set(!collapsed())">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="example-spacer"></span>
      <h1>Bienvenido</h1>
      <span class="example-spacer"></span>

      <button mat-icon-button (click)="isDarkMode.set(!isDarkMode())">
        <mat-icon>
          {{isDarkMode() ? 'dark_mode' : 'light_mode'}}
        </mat-icon>
      </button>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav opened mode="side" [style.width]="sidenavWidth()">
        <app-menu [collapsed]="collapsed()" />
      </mat-sidenav>

      <mat-sidenav-content class="content" [style.margin-left]="sidenavWidth()">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-toolbar {
      position: relative;
      z-index: 5;
      box-shadow: var(--mat-sys-level3);
      background: #021B79; 
      color: white;
    }
  
    mat-sidenav-container {
      height: calc(100vh - 64px);
    }
  
    mat-sidenav {
      border-radius: 0;
      background: #021B79;
      color: white; /* Texto dentro del sidenav */
    }
  
    mat-sidenav-content {
      transition: all 0.5s ease-in-out;
    }
  
    .content {
      padding: 24px;
    }
  
    .example-spacer {
      flex: 1 1 auto;
    }
  `],
  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfesoraComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  isDarkMode = signal(false);

  private _document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this._document.body.classList.toggle('dark', this.isDarkMode());
    });
  }
}
