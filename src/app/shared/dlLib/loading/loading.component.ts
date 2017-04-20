import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dl-loading',
  templateUrl: 'loading.component.html',
})
export class LoadingComponent implements OnInit {
  @Input() type: string;
  loading: any = {};

  ngOnInit() {
    let typeList = ['max', 'medium', 'min'];
    if (typeList.indexOf(this.type) > -1) {
      this.loading[`dl-loading-${this.type}`] = true;
    } else {
      this.loading[`dl-loading-max`] = true;
    }
  }
}
