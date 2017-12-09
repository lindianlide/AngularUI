import { Routes } from '@angular/router';

export const AppRoutes:Routes =[
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    redirectTo: 'main/home',
  }
];
