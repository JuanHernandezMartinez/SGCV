import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { SensoresCardComponent } from '../sensores-card/sensores-card.component';

@Component({
  selector: 'app-sensores',
  standalone: true,
  imports: [ButtonModule, VolverButtonComponent, SensoresCardComponent],
  templateUrl: './sensores.component.html',
  styleUrl: './sensores.component.css',
})
export class SensoresComponent {


  sensores=[
    {nombre:'Sensor 1', status:true},{nombre:'Sensor 2', status:false},{nombre:'Sensor 3', status:true},{nombre:'Sensor 4', status:false},
  ]
  temperatura=30
}
