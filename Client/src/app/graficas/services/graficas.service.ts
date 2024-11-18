import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  private http = inject(HttpClient);
  private url = `${environment.BASE_ENDPOINT}/temperaturas`;

  public obtenerTemperaturas(): Observable<any> {
    return this.http.get(this.url);
  }
}
