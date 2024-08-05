import { Component, inject, OnInit } from '@angular/core';
import { VolverButtonComponent } from '../../../shared/components/volver-button/volver-button.component';
import { ChartModule } from 'primeng/chart';
import { MatListModule } from '@angular/material/list';
import { GraficasService } from '../../services/graficas.service';
@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [VolverButtonComponent, ChartModule, MatListModule],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent implements OnInit {
  graficaService = inject(GraficasService);
  options: any;
  mediciones: any;
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  data: any = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [],
  };

  ngOnInit(): void {
    this.graficaService.mediciones$.subscribe((mediciones) => {
      console.log(mediciones)
      this.data.datasets= mediciones;
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
