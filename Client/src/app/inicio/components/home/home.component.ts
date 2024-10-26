import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  salir(): void {
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