import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentilacionService {
  private url = environment.BASE_ENDPOINT;
  constructor(private http: HttpClient) {}

  public checkFansStatus():Observable<any>{
    return this.http.get(`${this.url}/ventilacion/status`)
  }

  public getFans(): Observable<any> {
    return this.http.get(`${this.url}/sensors`);
  }

  public getFan(id: number): Observable<any> {
    return this.http.get(`${this.url}/sensors/${id}`);
  }

  public turnFan(ventiladorId:number): Observable<any> {
    return this.http.post<any>(`${this.url}/ventilacion/turn/${ventiladorId}`, {});
  }
}
