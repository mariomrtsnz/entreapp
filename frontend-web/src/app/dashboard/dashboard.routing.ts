import { Routes } from '@angular/router';
import { PoiComponent } from './poi/poi.component';

export const DashboardRoutes: Routes = [{
  path: '',
  children: [{
    path: 'poi',
    component: PoiComponent
  },
//  {
//     path: 'RUTA',
//     component: COMPONENTE
//   }
    ]
}];
