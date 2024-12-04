import { Component, inject, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { Medicion } from '../../../models/Medicion';
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css'],
})
export class GraficasComponent implements OnInit {
  private graficasService = inject(GraficasService);
  originalMulti: any[] = [];
  filteredMulti: any[] = [];
  multi: MultiAdapter[] = [];
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

  ngOnInit(): void {
    this.graficasService.obtenerTemperaturas().subscribe(({ data }) => {
      let multiAdapterList: MultiAdapter[] = [];

      data.forEach((m: any) => {
        let multiAdapter: MultiAdapter = new MultiAdapter();
        let seriesAdapter: SeriesAdapter = new SeriesAdapter();
        multiAdapter.series = [];
        multiAdapter.name = m.basicName;
        m.json_agg.forEach((serie: any) => {
          seriesAdapter.name = serie.fecha;
          seriesAdapter.value = serie.temperature;
        });
        multiAdapter.series.push(seriesAdapter);
        multiAdapterList.push(multiAdapter);
      });
      this.multi = multiAdapterList;
      this.originalMulti = multiAdapterList;
      console.log(this.multi);
    });
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

class MultiAdapter {
  name: string;
  series: SeriesAdapter[];
}
class SeriesAdapter {
  name: string;
  value: number;
}
