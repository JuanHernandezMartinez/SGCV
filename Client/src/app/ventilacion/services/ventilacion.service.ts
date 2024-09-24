import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class VentilacionService {
  //private http = inject(HttpClient);
  constructor(private http:HttpClient) {}

  public turnFan():Observable<any>{
    const datos = {
      fan: 1,
      on: 1,
    };
    return this.http.post('http://192.168.1.184', datos);
  }
}
