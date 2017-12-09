import { Routes } from '@angular/router';
import { FullComponent } from './full.component';
import { HomeComponent } from './home/home.component';

export const FullRoutes:Routes = [
  {
    path: 'main',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'components',
        loadChildren: './demo/demo.module#DemoModule'
        //loadChildren:'./demo/demo.module.ngfactory#ModuleNgFactory'
      }
    ]
  }
];
