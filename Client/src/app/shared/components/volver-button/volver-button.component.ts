import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-volver-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './volver-button.component.html',
  styleUrl: './volver-button.component.css',
})
export class VolverButtonComponent {
  constructor(private router: Router) {}

  volver(): void {
    this.router.navigateByUrl('/home');
  }
}
