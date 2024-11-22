import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormularioSensoresComponent } from '../formulario-sensores/formulario-sensores.component';

@Component({
  selector: 'app-sensores-configuration',
  standalone: true,
  imports: [
    MatCardModule,
    InputSwitchModule,
    VolverButtonComponent,
    ButtonModule,
    RouterModule,
    MatDialogModule,
    FormularioSensoresComponent,
  ],
  templateUrl: './sensores-configuration.component.html',
  styleUrl: './sensores-configuration.component.css',
})
export class SensoresConfigurationComponent {
  ventiladores = [];
  // private dialogRef=inject(MatDialogRef<FormularioSensoresComponent>)

  constructor(private dialogRef: MatDialog) {}

  post(): void {}

  openForm(): void {
    this.dialogRef.open(FormularioSensoresComponent, {
      width: '1000px',
      hasBackdrop: false,
      panelClass: 'custom-dialog',
    });
  }
}