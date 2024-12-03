import { Component, inject, OnInit } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatCardModule } from '@angular/material/card';
import { VentilacionService } from '../../services/ventilacion.service';
@Component({
  selector: 'app-ventilacion',
  standalone: true,
  imports: [
    VolverButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    InputSwitchModule,
    MatCardModule,
  ],
  templateUrl: './ventilacion.component.html',
  styleUrl: './ventilacion.component.css',
})
export class VentilacionComponent implements OnInit {
  public ventiladores = [{ name: 'Ventilador 1', pin: 17, powered: true }, { name: 'Ventilador 2', pin: 4, powered: true }];
  private ventilacionService = inject(VentilacionService);

  ngOnInit(): void {
    this.checkStatus();
  }

  private checkStatus(): void {
    this.ventilacionService.checkFansStatus().subscribe((info) => {
      let data : { pin: number, powered: boolean }[] = info.status
      console.log(data);
      this.ventiladores.forEach((v) => {
        data.forEach((d) => {
          if (v.pin === d.pin) {
            v.powered = !d.powered
          }
        })
      })
    });
  }

  public turn(ventiladorId: number): void {
    console.log(ventiladorId);
    this.ventilacionService.turnFan(ventiladorId).subscribe((data) => {
      console.log(data);
      this.checkStatus();
    });
  }
}
