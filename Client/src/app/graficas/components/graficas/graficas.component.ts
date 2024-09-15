import { Component, inject, OnInit } from '@angular/core';
import { multi } from './data';
import { GraficasSocketService } from '../../services/graficas-socket.service';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  graficasSocketService = inject(GraficasSocketService);
  multi: any[] = [];
  view: [number, number] = [700, 300];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Temperatura';
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  // anadir(): void {
  //   console.log('añadiendo');

  //   // Crear una copia de newSerie antes de modificarla
  //   this.newSerie = { ...this.newSerie };

  //   // Incrementar el año y el valor del nuevo objeto
  //   let incDate = parseInt(this.newSerie.name);
  //   incDate += 1;
  //   this.newSerie.name = incDate.toString();
  //   this.newSerie.value += 5000000;

  //   // Agregar la nueva entrada a la serie de datos
  //   this.multi[0].series.push(this.newSerie); // Agregar la copia, no el objeto original

  //   // Actualizar la referencia para que Angular detecte el cambio
  //   this.multi = [...this.multi];

  //   console.log('finalizado', this.multi[0]);
  // }

  constructor() {
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.graficasSocketService.onWelcome((message: any[]) => {
      console.log(message);

      this.multi = message;
    });
  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
