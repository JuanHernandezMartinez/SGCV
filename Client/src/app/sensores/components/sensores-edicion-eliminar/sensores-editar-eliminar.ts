@@ -0,0 +1,44 @@

import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioSensoresComponent } from '../formulario-sensores/formulario-sensores.component';

@Component({
  selector: 'app-sensores-configuration',
  standalone: true,
  imports: [
    MatCardModule,
    InputSwitchModule,
    ButtonModule,
    RouterModule,
    MatDialogModule,
    FormularioSensoresComponent,
  ],
  templateUrl: './sensores-configuration.component.html',
  styleUrls: ['./sensores-configuration.component.css'],
})
export class SensoresConfigurationComponent {
  ventiladores = [
    { name: 'Sensor 1' },
    { name: 'Sensor 2' },
    { name: 'Sensor 3' },
  ];

  constructor(private dialogRef: MatDialog) {}

  post(): void {}

  openForm(): void {
    this.dialogRef.open(FormularioSensoresComponent, {
      width: '1000px',
      hasBackdrop: false,
      panelClass: 'custom-dialog',
    });
  }

  toggleSensor(item: any): void {
    console.log('Sensor toggled', item);
    // Lógica para manejar el cambio de estado del sensor
  }

  editSensor(index: number): void {
    console.log('Editar sensor en el índice', index);
    // Lógica para editar el sensor, tal vez abrir un formulario de edición
    const sensor = this.ventiladores[index];
    this.dialogRef.open(FormularioSensoresComponent, {
      width: '1000px',
      data: { sensor },
      hasBackdrop: true,
    });
  }

  deleteSensor(index: number): void {
    console.log('Eliminar sensor en el índice', index);
    this.ventiladores.splice(index, 1);
  }
}
