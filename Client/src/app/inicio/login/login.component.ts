import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario!: string;
  password!: string;

  public signIn(): void {
    if (this.usuario && this.password) {
      Swal.fire({
        icon: 'success',
        title: 'Sesión iniciada',
        text: 'bienvenido...',
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
