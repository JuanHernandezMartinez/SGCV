import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-formulario-sensores',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    InputSwitchModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './formulario-sensores.component.html',
  styleUrl: './formulario-sensores.component.css',
})
export class FormularioSensoresComponent {}
