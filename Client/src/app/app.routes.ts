import { Routes } from '@angular/router';
import { LoginComponent } from './inicio/components/login/login.component';
import { HomeComponent } from './inicio/components/home/home.component';
import { SensoresComponent } from './sensores/components/sensores/sensores.component';
import { GraficasComponent } from './graficas/components/graficas/graficas.component';
import { VentilacionComponent } from './ventilacion/components/ventilacion/ventilacion.component';
import { FormularioSensoresComponent } from './sensores/components/formulario-sensores/formulario-sensores.component';
import { SensoresConfigurationComponent } from './sensores/components/sensores-configuration/sensores-configuration.component';

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
    loadChildren: () =>
      import('./graficas/graficas.module').then((m) => m.GraficasModule),
  },
  {
    path: 'ventilacion',
    component: VentilacionComponent,
  },
  {
    path: 'sensores/formularioSensores',
    component: FormularioSensoresComponent,
  },
  {
    path: 'sensores/configuracion',
    component: SensoresConfigurationComponent,
  },
];
