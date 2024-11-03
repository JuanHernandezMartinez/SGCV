import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medicion } from '../models/Mediciones';

@Injectable({
  providedIn: 'root',
})
export class SensoresSocketService {
  private socketUrl: string = 'ws://localhost:4000';
  private medicionesSubject: BehaviorSubject<Medicion[]> = new BehaviorSubject<
    Medicion[]
  >([]);
  public medicionesEvent$: Observable<Medicion[]> =
    this.medicionesSubject.asObservable();
  private socket: WebSocket | null = null;

  //iniciar la conexion cuando se renderiza el componente
  public initSockets(): void {
    this.socket = new WebSocket(this.socketUrl);
    // Abrir la conexión
    this.socket.addEventListener('open', () => {
      console.log('Socket connection opened');
    });

    // Escuchar los mensajes
    this.socket.addEventListener('message', (event) => {
      let parseJson = JSON.parse(event.data);
      let mediciones: Medicion[] = [];
      if (parseJson?.mediciones) {
        mediciones = parseJson.mediciones;
        this.updateMediciones(mediciones);
      }
    });
  }

  //actualizar el observable
  public updateMediciones(mediciones: Medicion[]): any {
    this.medicionesSubject.next(mediciones);
    console.log('Actualizando mediciones');
  }
  public disconnect(): void {
    if (this.socket) {
      this.socket.close(); // Cierra la conexión WebSocket
      this.socket = null; // Limpia la referencia a la instancia WebSocket
      this.medicionesSubject.next([]); // Opcional: limpia el subject si es necesario
      console.log('Disconnected from WebSocket.');
    }
  }
}
