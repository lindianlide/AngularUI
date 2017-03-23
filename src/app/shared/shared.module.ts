import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DlLibModule } from './dlLib/dlLib.module';

const module = [
  CommonModule,
  FormsModule,
  HttpModule,
  DlLibModule
];

@NgModule({
  imports: module,
  exports: module
})

export class SharedModule {
}