import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioSensoresComponent } from '../formulario-sensores/formulario-sensores.component';
export interface Sensor {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

@Component({
  selector: 'app-sensores-configuration',
  templateUrl: './sensores-configuration.component.html',
  styleUrls: ['./sensores-configuration.component.css'],
})
export class SensoresConfigurationComponent {
  sensores: Sensor[] = [
    {
      id: 1,
      nombre: 'Sensor 1',
      descripcion: 'Descripción del sensor 1',
      activo: true,
    },
    {
      id: 2,
      nombre: 'Sensor 2',
      descripcion: 'Descripción del sensor 2',
      activo: false,
    },
  ];

  constructor(private dialogRef: MatDialog) {}

  // Abrir el formulario para agregar o editar un sensor
  openForm(sensor?: Sensor): void {
    const dialogRef = this.dialogRef.open(FormularioSensoresComponent, {
      width: '500px',
      data: sensor,
    });

    dialogRef.afterClosed().subscribe((result: Sensor) => {
      if (result) {
        if (sensor) {
          // Editar sensor
          this.updateSensor(result);
        } else {
          // Agregar nuevo sensor
          this.addSensor(result);
        }
      }
    });
  }

  // Agregar un nuevo sensor
  addSensor(sensor: Sensor): void {
    const newSensor = { ...sensor, id: this.sensores.length + 1 }; // Asignar un nuevo ID
    this.sensores.push(newSensor);
  }

  // Actualizar un sensor existente
  updateSensor(updatedSensor: Sensor): void {
    const index = this.sensores.findIndex((s) => s.id === updatedSensor.id);
    if (index !== -1) {
      this.sensores[index] = updatedSensor;
    }
  }

  // Eliminar un sensor
  deleteSensor(id: number): void {
    this.sensores = this.sensores.filter((s) => s.id !== id);
  }
}
