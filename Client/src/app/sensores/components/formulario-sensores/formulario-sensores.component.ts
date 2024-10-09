import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-formulario-sensores',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './formulario-sensores.component.html',
  styleUrl: './formulario-sensores.component.css'
})
export class FormularioSensoresComponent {

}
