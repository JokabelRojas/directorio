import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngresoTabletComponent } from './features/profesora/ingreso-tablet/ingreso-tablet.component'; // Importa tu componente
import { DirectoryComponent } from './features/admin/directory/directory.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IngresoTabletComponent,DirectoryComponent], // Incluye tu componente aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fatima';
}
