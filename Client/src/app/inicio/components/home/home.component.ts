import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

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

  public abrirFormulario() {
    console.log('algo anda mal');
    const dialog = this.dialog.open(RegisterComponent);
  }
}
