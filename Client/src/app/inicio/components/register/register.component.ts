import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  
  mostrarFormulario = false;
  usuario = { nombre: '', password: '', confirmPassword: '', rol: '' };

  roles: string[] = [];

  ngOnInit(): void {
    
  }
}
