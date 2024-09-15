import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraficasSocketService {
  private socketUrl: string = 'http://localhost:4000';
  

  constructor() {}
}
