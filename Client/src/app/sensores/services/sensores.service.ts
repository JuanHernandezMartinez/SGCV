import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Sensor } from '../models/Sensor';

@Injectable({
  providedIn: 'root',
})
export class SensoresService {
  private url = environment.BASE_ENDPOINT;
  private http = inject(HttpClient);

  public obtenerSensores(): Observable<any> {
    return this.http.get<any>(`${this.url}/sensores`);
  }

  public obtenerSensorPorBasicName(basicName:string):Observable<any>{
    return this.http.get(`${this.url}/sensores/buscar/${basicName}`)
  }

  public consultarSensoresEsp(): Observable<any> {
    return this.http.get<any>(`${this.url}/sensores/esp`);
  }

  public registrarSensor(sensor: any): Observable<any> {
    return this.http.post<any>(`${this.url}/sensores`, sensor);
  }

  public editarSensor(sensor: Sensor): Observable<any> {
    return this.http.put(`${this.url}/sensores/${sensor.id}`, sensor);
  }

  public eliminarSensorConfigurado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/sensores/${id}`);
  }
}
