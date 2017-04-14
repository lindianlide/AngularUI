import { Component } from '@angular/core';

@Component({
  templateUrl: './notice.component.html'
})

export class NoticeComponent {
  successCode: string;
  warningCode: string;
  errorCode: string;
  successShow: boolean = false;
  warningShow: boolean = false;
  errorShow: boolean = false;

  constructor() {
    this.successCode = `
        <dl-notice [classType]="'success'" [(show)]="successShow"></dl-notice>`;

    this.warningCode = `
       <dl-notice [classType]="'warning'" [(show)]="warningShow"></dl-notice>`;

    this.errorCode = `
       <dl-notice [classType]="'error'" [(show)]="errorShow"></dl-notice>`;
  }
}
