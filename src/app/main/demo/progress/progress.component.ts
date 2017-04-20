import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'progress.component.html',
})

export class ProgressComponent implements OnInit {
  private infoPercent: number;
  progressCode: string = `
  <dl-progress [percentage]="infoPercent" [type]="'lg'" [bartype]="'info'"></dl-progress>
  <dl-progress [percentage]="'50'" [type]="'lg'" [bartype]="'warning'"></dl-progress>
  <dl-progress [percentage]="infoPercent" [type]="'sm'" [bartype]="'info'"></dl-progress>
  <dl-progress [percentage]="'50'" [type]="'sm'" [bartype]="'warning'"></dl-progress>`;
  loadingCode: string = `
  <dl-loading [type]="'max'"></dl-loading>
  <dl-loading [type]="'medium'"></dl-loading>
  <dl-loading [type]="'min'"></dl-loading>`;

  ngOnInit() {
    this.infoPercent = 0;
    setInterval(() => {
      this.infoPercent = this.infoPercent === 100 ? 0 : this.infoPercent + 10;
    }, 2000);
  }


}
