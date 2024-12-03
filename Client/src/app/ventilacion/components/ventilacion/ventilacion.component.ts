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
  ventiladores = ['Ventilador 1', 'Ventilador 2'];
  ventilacionService = inject(VentilacionService);

  ngOnInit(): void {
    // this.checkStatus();
  }

  private checkStatus(): void {
    this.ventilacionService.checkFansStatus().subscribe((data) => {
      console.log(data);
    });
  }

  public turn(ventiladorId: number): void {
    console.log(ventiladorId);
    return;
    this.ventilacionService.turnFan(ventiladorId).subscribe((data) => {
      console.log(data);
    });
  }
}
