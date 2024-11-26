import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SensoresService } from '../../services/sensores.service';
import { FileUploadModule } from 'primeng/fileupload';
import { MatButtonModule } from '@angular/material/button';
import { CreateSensorDTO } from '../../models/CreateSensor.dto';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sensor } from '../../models/Sensor';

@Component({
  selector: 'app-formulario-sensores',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    InputSwitchModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    FileUploadModule,
    MatButtonModule,
  ],
  templateUrl: './formulario-sensores.component.html',
  styleUrl: './formulario-sensores.component.css',
})
export class FormularioSensoresComponent implements OnInit {
  @ViewChild('selectImage') public selectImage: any;
  private sensoresService = inject(SensoresService);
  private dialogRef = inject(MatDialogRef<FormularioSensoresComponent>);
  private data: Sensor = inject(MAT_DIALOG_DATA);
  sensorName: string;
  basicName: string;
  imageFile: File;
  image: string = 'algo';
  status: boolean;
  area: string;
  sensor: Sensor = new Sensor();

  sensoresEsp: { basicName: string }[] = [];

  ngOnInit(): void {
    if (this.data?.id) {
      console.log(this.data);
      this.sensor = this.data;
    }
    this.buscarSensoresEsp();
  }

  private buscarSensoresEsp(): void {
    this.sensoresService.consultarSensoresEsp().subscribe(
      ({ data }) => {
        this.sensoresEsp = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editarSensor(): void {
    this.sensoresService.editarSensor(this.sensor).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'Cambios guardados.',
        }).then(() => {
          this.dialogRef.close();
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'info',
          title: 'Algo salio mal',
          text: `${error.error.message}`,
        });
      }
    );
  }

  registrarSensor(): void {
    this.sensoresService.registrarSensor(this.sensor).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Listo',
          text: 'Sensor guardado.',
        }).then(() => {
          this.dialogRef.close();
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'info',
          title: 'Algo salio mal',
          text: `${error.error.message}`,
        });
      }
    );
  }

  public onBasicUploadAuto(event: any): void {
    this.imageFile = event.target.files[0];
  }

  triggerInput() {
    this.selectImage.nativeElement.click(); // Simulamos un click en el input
  }
}
