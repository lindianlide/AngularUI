import { Component, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'dl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent {
  @Input() label:string;
  @Input() classType:string = 'lg';
  @Input() placeholder:string;
  @Input() disabled:boolean;
  @Input() required:boolean;
  inputId:string;
  showHint:boolean = false;

  constructor() {
    this.inputId = 'dl-input' + UUID.UUID();
  }

  setClass() {
    return 'dl-input ' + this.classType;
  }
}