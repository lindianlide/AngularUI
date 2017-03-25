import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DemoComponent } from './demo.component';
import { DemoRoutes } from './demo.routes';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { WizardComponent } from './wizard/wizard.component';

@NgModule({
  declarations: [
    DemoComponent,
    ButtonComponent,
    InputComponent,
    WizardComponent
    
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(DemoRoutes)
  ]
})

export class DemoModule {
}