import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SensoresSocketService {
  private socketUrl: string = 'http://localhost:4000';
  private socket!: Socket;
  constructor() {
    this.connect()
  }

  public connect() {
    this.socket = io(this.socketUrl);
    console.log("Connected")
  }
  public subscribeMonitoring(callback: (message: any[]) => void) {
    this.socket.on('monitoreoTemp', callback);
  }
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
