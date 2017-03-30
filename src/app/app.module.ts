import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FullModule } from './main/full.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { GlobalState } from './global.state';

const APP_PROVIDERS = [
  GlobalState
];
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
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
