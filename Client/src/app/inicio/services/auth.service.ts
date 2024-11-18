import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = `${environment.BASE_ENDPOINT}/auth`;
  private router = inject(Router);

  public login(user: string, password: string): void {
    let loginRequest = this.http.post(`${this.url}/login`, { user, password });

    loginRequest.subscribe(
      (data: any) => {
        localStorage.setItem('access_token', data?.access_token);
        Swal.fire({
          icon: 'success',
          title: 'Sesión iniciada.',
          text: `Bienvenido ${user}`,
        }).then(() => {
          this.router.navigateByUrl('/home');
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: `${error.error.message}`,
        });
      }
    );
  }

  public register() {}

  public logout() {
    localStorage.removeItem('access_token');
  }
}
