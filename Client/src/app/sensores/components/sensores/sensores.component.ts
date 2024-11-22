import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { SensoresCardComponent } from '../sensores-card/sensores-card.component';
import { SensoresSocketService } from '../../services/sensores-socket.service';
import { Medicion } from '../../models/Mediciones';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sensores',
  standalone: true,
  imports: [ButtonModule, VolverButtonComponent, SensoresCardComponent, RouterModule],
  templateUrl: './sensores.component.html',
  styleUrl: './sensores.component.css',
})
export class SensoresComponent implements OnInit, OnDestroy {
  private sensoresSocket = inject(SensoresSocketService);

  sensores: Medicion[] = [];
  temperatura: number = 0;

  ngOnInit(): void {
    this.listen();
    this.sensoresSocket.initSockets();
  }

  listen(): void {
    this.sensoresSocket.medicionesEvent$.subscribe((data: Medicion[]) => {
      this.sensores = data;
      console.log(data)
      if (this.sensores.length > 0) {
        this.calculateAvgTemp();
      }
    });
  }

  calculateAvgTemp(): void {
    let avg: number = 0;
    this.sensores.forEach((s) => {
      avg = avg + s.temperature;
    });
    avg = avg / this.sensores.length;
    this.temperatura = parseFloat(avg.toFixed(2));
  }

  ngOnDestroy(): void {
    this.sensoresSocket.disconnect();
  }
}