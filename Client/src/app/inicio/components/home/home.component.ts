import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  mostrarFormulario = false;
  usuario = { nombre: '', password: '' };

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

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  agregarUsuario() {
    console.log('Usuario agregado:', this.usuario.nombre);
    console.log('Contraseña:', this.usuario.password);
    this.usuario = { nombre: '', password: '' };
    this.cerrarFormulario();
  }

  eliminarUsuario() {
    console.log('Usuario eliminado:', this.usuario.nombre);
    this.usuario = { nombre: '', password: '' }; 
    this.cerrarFormulario(); 
  }
}