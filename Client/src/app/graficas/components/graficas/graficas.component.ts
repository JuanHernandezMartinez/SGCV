import { Component, inject, OnInit } from '@angular/core';
// import { multi } from './data';
import { GraficasSocketService } from '../../services/graficas-socket.service';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  graficasSocketService = inject(GraficasSocketService);
  originalMulti: any[] = [];
  filteredMulti: any[] = [];
  multi: any[] = [];
  view: [number, number] = [1200, 500];
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
    this.graficasSocketService.subscribeTemperatures((message: any[]) => {
      this.originalMulti = message;
      this.multi = message;
    });
  }

  deleteFilter(): void {
    this.multi = this.originalMulti;
    this.graficasSocketService.connect()
  }

  onSelect(data: any): void {
    console.log(data);
    this.graficasSocketService.disconnect();
    this.filteredMulti = this.multi.filter((sensor) => sensor.name === data);
    this.multi = this.filteredMulti;
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
    console.log('activando');
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    console.log('desactivando');
  }
}
