import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  socket = io('http://localhost:4000');
  private medicionesDataSubject = new BehaviorSubject<any>([]);
  mediciones$: Observable<any> = this.medicionesDataSubject.asObservable();

  constructor() {
    this.socket.on('connection', () => {
      console.log("Sockets conectados")
    });

    this.socket.on('temperaturas', (mediciones) => {
      this.setTemperaturas(mediciones);
    });
  }

  private setTemperaturas(mediciones: any): void {
    this.medicionesDataSubject.next(mediciones);
  }
}
