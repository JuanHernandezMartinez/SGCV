import { Injectable } from '@angular/core';
import { Message, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class SensoresSocketService {
  private socketUrl: string = 'http://localhost:4000';
  private topic = '';
  private stompClient!: Client;

  constructor() {}

  initConnenctionSocket() {
    const url = this.socketUrl;

    // const socket = new SockJS(url);
    // this.stompClient = Stomp.over(socket);
    console.log('Iniciando conexión chat socket service');

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(url),
      connectHeaders: {},
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: Chat soocket service');
      this.joinTopic();
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.onWebSocketClose = (evt) => {
      console.log(`Chat socket service closed with`);
      this.disconect();
    };

    this.stompClient.activate();
  }

  public joinTopic() {
    if (this.stompClient.connected) {
      this.subscribeToTopic();
    } else {
      this.stompClient.onConnect = (frame) => {
        console.log('Chat socket connected, subscribing to topic wp now.');
        this.subscribeToTopic();
      };
    }
  }

  private subscribeToTopic() {
    try {
      this.stompClient.subscribe(`/topic/wp`, (message: any) => {
        const content = JSON.parse(message.body);
        console.log(content);
      });
    } catch (error) {
      console.error(`Error subscribing to topic /topic/wp`, error);
    }
  }

  public disconect(): void {
    this.stompClient.deactivate();
    console.log('Chat socket desconectado');
  }
}
