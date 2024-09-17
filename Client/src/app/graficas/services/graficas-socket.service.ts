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
  connect() {
    this.socket = io(this.socketUrl);
  }
  subscribeTemperatures(callback: (message: any[]) => void) {
    this.socket.on('temperaturas', callback);
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
