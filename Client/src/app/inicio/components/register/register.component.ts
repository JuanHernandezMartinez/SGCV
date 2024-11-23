import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MatCardModule,
    TreeSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<RegisterComponent>);
  mostrarFormulario = false;
  usuario = { nombre: '', password: '', confirmPassword: '', rol: '' };
  usuarios: any[] = [];
  roles: [] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.consultarUsuarios().subscribe((data) => {
      console.log(data.usuarios);
      this.usuarios = data.usuarios;
      console.log(this.usuario);
    });
  }

  public enviarDatos() {
    this.authService
      .register(
        this.usuario.nombre,
        this.usuario.password,
        this.usuario.confirmPassword,
        this.usuario.rol
      )
      .subscribe(
        (data) => {
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
      );
  }

  public cerrarFormulario() {
    this.dialogRef.close();
  }
}
