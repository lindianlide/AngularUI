import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FullModule } from './main/full.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FullModule,
    RouterModule.forRoot(AppRoutes)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
