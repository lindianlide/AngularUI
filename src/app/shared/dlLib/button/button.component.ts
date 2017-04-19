import { Component, Input } from '@angular/core';

@Component({
  selector: 'dl-button',
  templateUrl: './button.component.html'
})

export class ButtonComponent {

  @Input() classType: string;
  @Input() i: string;
  @Input() disabled: boolean;
  @Input() type: string;

  constructor() {
    this.type = 'button';
  }

  setClass() {
    return 'btn dl-btn dl-btn-' + this.classType;
  }

  setIClass() {
    return 'fa fa-' + this.i;
  }
}
