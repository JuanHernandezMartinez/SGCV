import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private http = inject(HttpClient);

  public obtenerRoles(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:4000/roles');
  }
}
