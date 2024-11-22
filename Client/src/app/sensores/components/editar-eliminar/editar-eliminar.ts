import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputSwitch, InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'editar-eliminar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    InputSwitchModule,
    ButtonModule,
    FloatLabelModule,
    @Component({
      selector: 'button-toggle-overview-example',
      templateUrl: 'button-toggle-overview-example.html',
      imports: [MatButtonToggleModule],
  ],
  templateUrl: './editar.html',
  styleUrl: './eliminar.component.css',
})
export class FormularioSensoresComponent {}
export class ButtonToggleOverviewExample {}