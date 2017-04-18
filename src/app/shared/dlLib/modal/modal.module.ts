import { NgModule } from '@angular/core';

import { ModalComponent } from './modal.component';
import { ButtonModule } from '../button/button.module';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    ModalComponent
  ]
})

export class ModalModule {

}
