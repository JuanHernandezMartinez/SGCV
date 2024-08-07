import { Component } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MatCardModule } from '@angular/material/card';
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
export class VentilacionComponent {
  ventiladores = ['ventilador 1', 'ventilador 2', 'ventilador 3'];
}
