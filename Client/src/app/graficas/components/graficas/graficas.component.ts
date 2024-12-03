import { Component, inject, OnInit } from '@angular/core';
// import { multi } from './data';
import { GraficasSocketService } from '../../services/graficas-socket.service';
import { GraficasService } from '../../services/graficas.service';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  graficasSocketService = inject(GraficasSocketService);
  private graficasService = inject(GraficasService);
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

  constructor() {}

  ngOnInit(): void {
    // this.graficasSocketService.subscribeTemperatures((message: any[]) => {
    //   this.originalMulti = message;
    //   this.multi = message;
    // });
    this.graficasService.obtenerTemperaturas().subscribe(
      (event) => {
        // console.log(event.data);
        // event.data.forEach(
        //   (event: { sensorName: string; temperature: number }) => {
        //     let serie = { name: Date().toString(), value: event.temperature };
        //     let adapter = new EventAdapter();
        //     adapter.name = event.sensorName;
        //     adapter.series?.push(serie);
        //     this.originalMulti.push(adapter);
        //   }
        // );
        // this.originalMulti = event.data;
        // this.multi = event.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteFilter(): void {
    this.multi = this.originalMulti;
    // this.graficasSocketService.connect()
  }

  onSelect(data: any): void {
    console.log(data);
    // this.graficasSocketService.disconnect();
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

class EventAdapter {
  name: string;
  series: [{ name: string; value: number }];
}
