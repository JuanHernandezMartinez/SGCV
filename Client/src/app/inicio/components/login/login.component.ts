import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario!: string;
  password!: string;

  constructor(private router: Router) {}

  public signIn(): void {
    if (this.usuario && this.password) {
      Swal.fire({
        icon: 'success',
        title: 'Sesión iniciada',
        text: `bienvenido ${this.usuario}...`,
      }).then(() => {
        this.router.navigateByUrl('/home');
      });
    } else if (!this.usuario || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: 'Intenta de nuevo',
      });
    }
  }
}
