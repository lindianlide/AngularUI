import { Component, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'dl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent {
  @Input() label:string;
  inputId:string;

  constructor() {
    this.inputId = 'dl-input' + UUID.UUID();
  }

  showHint:boolean = false;
}