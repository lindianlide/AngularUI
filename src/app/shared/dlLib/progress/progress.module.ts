import { NgModule } from '@angular/core';

import { ProgressComponent } from './progress.component';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProgressComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ProgressComponent
  ]
})

export class ProgressModule {

}
