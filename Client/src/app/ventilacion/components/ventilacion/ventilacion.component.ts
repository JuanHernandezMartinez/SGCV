import { Component, inject } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatCardModule } from '@angular/material/card';
import { VentilacionService } from '../../services/ventilacion.service';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule
  ],
  templateUrl: './ventilacion.component.html',
  styleUrl: './ventilacion.component.css',
})
export class VentilacionComponent {
  ventiladores = ['ventilador 1', 'ventilador 2', 'ventilador 3'];
  ventilacionService = inject(VentilacionService);
  public post(): void {
    console.log("ejecutando")
    this.ventilacionService.turnFan().subscribe((data) => {
      console.log(data);
    });
  }
}
