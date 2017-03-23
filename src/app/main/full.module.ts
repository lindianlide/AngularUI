import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullComponent } from './full.component';
import { FullRoutes } from './full.routes';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    FullComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(FullRoutes)
  ],

})

export class FullModule {
}
