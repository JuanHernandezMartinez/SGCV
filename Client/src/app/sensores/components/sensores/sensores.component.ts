import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';

@Component({
  selector: 'app-sensores',
  standalone: true,
  imports: [ButtonModule, VolverButtonComponent],
  templateUrl: './sensores.component.html',
  styleUrl: './sensores.component.css',
})
export class SensoresComponent {}
