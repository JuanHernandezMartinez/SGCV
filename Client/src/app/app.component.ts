import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraficasModule } from './graficas/graficas.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraficasModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
