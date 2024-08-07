import { Component, OnInit } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { MatListModule } from '@angular/material/list';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { io } from 'socket.io-client';
// https://stackblitz.com/edit/ng2-charts-dynamic?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.module.ts,src%2Fapp%2Fhello.component.html,src%2Fapp%2Fhello.component.ts,src%2Fapp%2Fdata.service.ts

@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [VolverButtonComponent, MatListModule, BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent implements OnInit {
  // private socket = io('http://localhost:4000');
  typesOfShoes: string[] = [
    'Sensor 1',
    'Sensor 2',
    'Sensor 3',
    'Sensor 4',
    'Sensor 5',
  ];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor() {
    // console.log("constructor")
    // this.socket.on('connection', () => {
    //   console.log("Sockets conectados")
    // });
  }

  ngOnInit(): void {
  }
}
