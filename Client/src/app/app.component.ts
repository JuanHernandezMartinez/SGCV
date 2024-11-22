import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GraficasModule } from './graficas/graficas.module';
import { TokenService } from './services/token-service.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraficasModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private tokenService=inject(TokenService)

  constructor(){
    this.tokenService.getToken()
  }

}
