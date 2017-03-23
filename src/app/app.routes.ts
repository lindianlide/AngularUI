import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

export const AppRoutes=[
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
