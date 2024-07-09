import { Routes } from '@angular/router';
import { LoginComponent } from './inicio/components/login/login.component';
import { HomeComponent } from './inicio/components/home/home.component';
import { SensoresComponent } from './sensores/components/sensores/sensores.component';
import { GraficasComponent } from './graficas/components/graficas/graficas.component';
import { VentilacionComponent } from './ventilacion/components/ventilacion/ventilacion.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sensores',
    component: SensoresComponent,
  },
  {
    path: 'graficas',
    component: GraficasComponent,
  },
  {
    path: 'ventilacion',
    component: VentilacionComponent,
  },
];
