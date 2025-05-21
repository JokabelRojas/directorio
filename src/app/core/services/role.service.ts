// src/app/core/services/role.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private currentRole: string | null = null;

  setRole(role: string) {
    this.currentRole = role;
    localStorage.setItem('role', role); // Persistencia
  }

  getRole(): string | null {
    return this.currentRole || localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getRole();
  }
}
