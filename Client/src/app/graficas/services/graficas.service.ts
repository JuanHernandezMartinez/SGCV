import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  socket = io('http://localhost:4000');
  private areaDataSubject = new BehaviorSubject<any>([]);
  mediciones$: Observable<any> = this.areaDataSubject.asObservable();

  constructor() {
    this.socket.on('connection', () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on('temperaturas', (temperaturas) => {
      console.log("nueva temperatura")
      this.setTemperaturas(temperaturas);
    });
  }

  private setTemperaturas(mediciones: any): void {
    console.log(mediciones)
    this.areaDataSubject.next(mediciones);
  }
}
