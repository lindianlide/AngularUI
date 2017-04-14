import { Component, Input } from '@angular/core';

@Component({
  selector: 'dl-notice',
  templateUrl: './notice.component.html'
})

export class NoticeComponent {

  @Input() classType: string;

  @Input()
  get show(): boolean {
    return this._show;
  }

  set show(isShow: boolean) {
    if (this.classType === 'success' && isShow) {
      this._show = true;
      this.closeButton = false;
      setTimeout(() => this._show = false, 3000);
    } else {
      this._show = isShow;
      this.closeButton = true;
    }
  }

  _show: boolean = true;
  closeButton: boolean = true;

  setClass() {
    return 'dl-alert dl-alert-' + this.classType;
  }

}
