import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  salir(): void {
    console.log('click');
    this.router.navigateByUrl('/');
  }
  sensores(): void {
    this.router.navigateByUrl('/sensores');
  }
  graficas(): void {
    this.router.navigateByUrl('/graficas');
  }
  ventilacion(): void {
    this.router.navigateByUrl('/ventilacion');
  }
}
