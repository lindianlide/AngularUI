import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarStaticComponent } from './sidebarStatic/sidebarStatic.component';

@NgModule({
  declarations: [
    SidebarStaticComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarStaticComponent
  ]
})

export class SidebarModule {

}