import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentilacionService {
  constructor(private http: HttpClient) {}

  public turnFan(): Observable<any> {
    const datos = {
      "fan": 1,
      "on": 1,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // this.http.get('http://192.168.37.180');
    return this.http.post('http://192.168.37.180/turn', datos);
  }
}
