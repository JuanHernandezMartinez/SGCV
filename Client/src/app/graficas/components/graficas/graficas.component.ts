import { Component, inject, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
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
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Temperatura';
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['red', 'blue', 'green', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  ngOnInit(): void {
    this.graficasService.obtenerTemperaturas().subscribe(({ data }) => {
      const multiAdapterList: MultiAdapter[] = [];
      console.log(data);
      data.forEach((m: any) => {
        console.log(m);
        const multiAdapter: MultiAdapter = new MultiAdapter();
        multiAdapter.series = [];
        multiAdapter.name = m.basicName;

        m.data.forEach((serie: any) => {
          // Crear una nueva instancia de SeriesAdapter para cada serie
          const seriesAdapter: SeriesAdapter = new SeriesAdapter();
          seriesAdapter.name = `${serie.year}y-${serie.month}m-${serie.day}d-${serie.hour}h-${serie.minute}min`;
          seriesAdapter.value = serie.temperature;

          multiAdapter.series.push(seriesAdapter);
        });

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
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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
