import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatCardModule } from '@angular/material/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

class Rol {
  name: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MatCardModule,
    TreeSelectModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<RegisterComponent>);
  mostrarFormulario = false;
  usuario = { nombre: '', password: '', confirmPassword: '', rol: '' };
  usuarios: any[] = [];
  roles: Rol[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.buscarUsuarios();
    this.buscarRoles();
  }

  private buscarUsuarios() {
    this.authService.consultarUsuarios().subscribe((data) => {
      this.usuarios = data.usuarios;
    });
  }
  private buscarRoles() {
    this.authService.consultarRoles().subscribe((data) => {
      if (data.roles.length >= 1) {
        console.log('Asignando roles');
        this.roles = data.roles;
      }

      console.log(this.roles);
    });
  }

  public registrar() {
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
          this.buscarUsuarios();
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
