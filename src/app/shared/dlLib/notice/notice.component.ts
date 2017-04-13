import { Component, Input } from '@angular/core';

@Component({
  selector: 'dl-notice',
  templateUrl: './notice.component.html'
})

export class NoticeComponent {

  @Input() classType: string;

  isShowSuccess: boolean = false;
  isShowAttention: boolean = false;
  isShowAlarm: boolean = false;

  showSuccess() {
    this.isShowSuccess = true;
    setTimeout(() => {
      this.isShowSuccess = false;
    }, 3000);
  }

  setClass() {
    return 'dl-alert dl-alert-' + this.classType;
  }

}
