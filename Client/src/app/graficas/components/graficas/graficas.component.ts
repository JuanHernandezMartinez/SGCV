import { Component, inject, OnInit } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { MatListModule } from '@angular/material/list';
import { GraficasService } from '../../services/graficas.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [VolverButtonComponent, MatListModule, BaseChartDirective],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent implements OnInit {
  graficaService = inject(GraficasService);
  typesOfShoes: string[] = [
    'Sensor 1',
    'Sensor 2',
    'Sensor 3',
    'Sensor 4',
    'Sensor 5',
  ];

  title = 'ng2-charts-demo';

  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Real-time data',
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartLegend = true;

  ngOnInit(): void {
    this.graficaService.mediciones$.subscribe((mediciones) => {
      this.updateChart(mediciones);
    });
  }
  updateChart(data: { value: number, label: string }) {
    this.lineChartData.datasets[0].data.push(data.value);
    this.lineChartData.labels?.push(data.label);
  }
}
