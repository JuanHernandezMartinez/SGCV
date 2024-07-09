import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-sensores-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './sensores-card.component.html',
  styleUrl: './sensores-card.component.css'
})
export class SensoresCardComponent {

  @Input() public nombre!:String

  

}
