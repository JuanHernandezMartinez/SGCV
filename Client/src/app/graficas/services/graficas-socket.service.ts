import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class GraficasSocketService {
  private socketUrl: string = 'http://localhost:4000';
  private socket!: Socket;
  constructor() {
    this.connect();
  }
  public connect() {
    this.socket = io(this.socketUrl);
  }
  public subscribeTemperatures(callback: (message: any[]) => void) {
    this.socket.on('temperaturas', callback);
  }
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
