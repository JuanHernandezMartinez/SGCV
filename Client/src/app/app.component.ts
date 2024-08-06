import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Client';
}
