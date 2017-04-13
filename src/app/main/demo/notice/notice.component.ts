import { Component } from '@angular/core';

@Component({
  templateUrl: './notice.component.html'
})

export class NoticeComponent {
  successCode: string;
  alarmCode: string;
  attentionCode: string;
  constructor() {
    this.successCode = `
      <dl-notice [classType]="'success'"></dl-notice>`;

    this.alarmCode = `
       <dl-notice [classType]="'alarm'"></dl-notice>`;

    this.attentionCode = `
       <dl-notice [classType]="'attention'"></dl-notice>`;
  }
}
