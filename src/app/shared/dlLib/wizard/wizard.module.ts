import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../button/button.module';
import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizardStep.component';

@NgModule({
  declarations: [
    WizardComponent,
    WizardStepComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule  
  ],
  exports: [
    WizardComponent,
    WizardStepComponent
  ]
})

export class WizardModule {

}