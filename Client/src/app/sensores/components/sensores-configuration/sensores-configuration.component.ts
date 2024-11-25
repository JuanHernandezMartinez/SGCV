import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioSensoresComponent } from '../formulario-sensores/formulario-sensores.component';
import { SensoresService } from '../../services/sensores.service';
import { Sensor } from '../../models/Sensor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sensores-configuration',
  standalone: true,
  imports: [
    MatCardModule,
    InputSwitchModule,
    ButtonModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './sensores-configuration.component.html',
  styleUrl: './sensores-configuration.component.css',
})
export class SensoresConfigurationComponent implements OnInit {
  sensores: Sensor[] = [];
  private sensoresService = inject(SensoresService);
  private dialogRef = inject(MatDialog);

  ngOnInit(): void {
    this.buscarSensores();
  }

  private buscarSensores(): void {
    this.sensoresService.obtenerSensores().subscribe(
      (data) => {
        console.log(data);
        this.sensores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public eliminar(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Atencion',
      text: '¿Seguro que desea eliminar la configuracion?',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.sensoresService.eliminarSensorConfigurado(id).subscribe(
          (data) => {
            console.log('Valiendo verga 1');
            console.log(data);
            this.sensores = this.sensores.filter((s) => s.id !== id);
          },
          (error) => {
            console.log('Valiendo verga 2');
            console.log(error);
          }
        );
      }
      Swal.close();
    });
  }

  public openForm(): void {
    const dialog = this.dialogRef.open(FormularioSensoresComponent, {
      width: '1000px',
    });
    dialog.afterClosed().subscribe(() => {
      this.buscarSensores();
    });
  }
}
