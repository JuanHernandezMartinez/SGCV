import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private dialogRef = inject(MatDialogRef<RegisterComponent>);
  mostrarFormulario = false;
  usuario = { nombre: '', password: '', confirmPassword: '', rol: '' };
  constructor(private authService: AuthService) { }

  public enviarDatos () {
    this.authService.register(this.usuario.nombre, this.usuario.password, this.usuario.confirmPassword, this.usuario.rol ).subscribe((data) => {
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado Con Exito.',
        text: `Se Ha Creado El Usuario ${this.usuario.nombre}`,
      });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: 'info',
        title: 'Algo salio mal',
        text: `${error.error.message}`,
      });
    }
    )}

  public cerrarFormulario() {
    this.dialogRef.close();
  }
}

