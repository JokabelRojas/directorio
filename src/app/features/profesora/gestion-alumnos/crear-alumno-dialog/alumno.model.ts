export interface Alumno {
  id: string;
  codigo: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fechaNacimiento?: Date;
  genero: 'M' | 'F' ;
  carrera: string;
  periodo: string;
  semestre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  contactoEmergencia?: string;
  telefonoEmergencia?: string;
  procedencia?: string;
  fechaCreacion: Date;
  estado: 'activo' | 'inactivo';
}