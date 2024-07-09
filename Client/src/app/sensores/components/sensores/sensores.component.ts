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

  nombres=[
    'chuma','eliju','toño'
  ]
}
