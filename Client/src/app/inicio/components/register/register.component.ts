import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private dialogRef = inject(MatDialogRef<RegisterComponent>);
  mostrarFormulario = false;
  usuario = { nombre: '', password: '', confirmPassword: '', rol: '' };

  public cerrarFormulario() {
    this.dialogRef.close();
  }
}
