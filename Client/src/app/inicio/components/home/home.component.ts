import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialog,
    private authService: AuthService
  ) {}

  salir(): void {
    this.authService.logout();
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

  abrirFormulario() {
    this.dialogRef.open(RegisterComponent, {
      width: '1000px',
    });
  }
}
