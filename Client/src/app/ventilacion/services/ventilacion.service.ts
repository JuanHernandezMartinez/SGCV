import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentilacionService {
  constructor(private http: HttpClient) {}

  public turnFan(): Observable<void> {
    return this.http.post<void>(
      'http://localhost:4000/api/ventilacion/turn',
      {}
    );
  }
}
