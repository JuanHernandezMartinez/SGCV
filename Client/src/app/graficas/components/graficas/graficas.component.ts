import { Component, OnInit } from '@angular/core';
import { multi } from './data';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  constructor() {
    Object.assign(this, { multi });
  }
  multi: any[] = [];
  view: [number, number] = [700, 300];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Temperatura';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  newData = {
    name: 'MEXICO',
    series: [
      { name: '1990', value: 58000000 },
      { name: '2010', value: 65000000 },
      { name: '2020', value: 67000000 },
    ],
  };

  newSerie = {
    name: '2020',
    value: 62000000,
  };

  anadir(): void {
    console.log('añadiendo');
  
    // Crear una copia de newSerie antes de modificarla
    this.newSerie = { ...this.newSerie };
  
    // Incrementar el año y el valor del nuevo objeto
    let incDate = parseInt(this.newSerie.name);
    incDate += 1;
    this.newSerie.name = incDate.toString();
    this.newSerie.value += 5000000;
  
    // Agregar la nueva entrada a la serie de datos
    this.multi[0].series.push(this.newSerie);  // Agregar la copia, no el objeto original
  
    // Actualizar la referencia para que Angular detecte el cambio
    this.multi = [...this.multi];
  
    console.log('finalizado', this.multi[0]);
  }

  ngOnInit(): void {}

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
