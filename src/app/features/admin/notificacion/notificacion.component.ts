import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent {
  tareas = [
    {
      titulo: 'Entrega de Proyecto Final',
      fechaVencimiento: '2025-05-15',
      descripcion: 'Recuerda entregar el proyecto final antes de la fecha límite.',
      estado: 'Pendiente',
    },
    {
      titulo: 'Examen de Matemáticas',
      fechaVencimiento: '2025-05-20',
      descripcion: 'Estudia los temas de álgebra y cálculo diferencial para el examen.',
      estado: 'Pendiente',
    },
    {
      titulo: 'Revisión de Tareas',
      fechaVencimiento: '2025-04-28',
      descripcion: 'Revisa todas tus tareas antes de la revisión del semestre.',
      estado: 'Aprobada',
    },
    {
      titulo: 'Entrega de Informe de Laboratorio',
      fechaVencimiento: '2025-05-10',
      descripcion: 'Entrega el informe de laboratorio antes de la fecha límite.',
      estado: 'Pendiente',
    }
  ];
}
