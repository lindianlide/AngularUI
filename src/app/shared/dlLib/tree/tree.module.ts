import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})

export class DlTreeModule {}
