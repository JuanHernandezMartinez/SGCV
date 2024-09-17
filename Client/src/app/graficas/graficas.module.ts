import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficasRoutingModule } from './graficas-routing.module';
import { GraficasComponent } from './components/graficas/graficas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { VolverButtonComponent } from '../shared/components/volver-button/volver-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [GraficasComponent],
  imports: [
    CommonModule,
    GraficasRoutingModule,
    VolverButtonComponent,
    NgxChartsModule,
    FormsModule,
    ButtonModule
  ],
})
export class GraficasModule {}
