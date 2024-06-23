import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule, MatCardHeader} from '@angular/material/card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatCardHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hola amix';
  amix = {
    nombres: 'chuma',
    apellidos: 'ayala',
    edad: 19,
  };
}
