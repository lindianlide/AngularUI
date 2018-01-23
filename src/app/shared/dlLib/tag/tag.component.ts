import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
@Component({
    selector: 'dl-tag',
    templateUrl: './tag.component.html'
})
export class TagComponent implements OnInit {
    selectedItem: any;
    activated: boolean[][];
    _data: any;
    @Input() default: any = {};
    @Input()
    set data(data: any) {
      this._data = data || [];
      this.selectedItem = {};
      this.activated = [];

      for (let item of this._data) {
        let lineActivated: boolean[] = [];

        if (item.value) {
          if (!this.default[item.id]) {
            this.default[item.id] = item.value[0].id;
          }
          //默认选中全部-1
          for (let itemVal of item.value) {
            if (itemVal.id === this.default[item.id]) {
              lineActivated.push(true);
              this.selectedItem[item.id] = itemVal;
            } else {
              lineActivated.push(false);
            }
          }
        }

        this.activated.push(lineActivated);
      }

      this.onShowCondition.emit(this.selectedItem);
    }
    get data() {
      return this._data;
    }
    @Output() onShowCondition = new EventEmitter<any>();

    constructor() {
      //null
    }

    ngOnInit() {
      //null
    }

    //====================================================================
    //条件变更
    //====================================================================
    itemChanged(i, j) {
      for (var k = 0; k < this.activated[i].length; k++) {
        //i行去掉焦点
        this.activated[i][k] = false;
      }
      this.activated[i][j] = true;
      let item: any = this._data[i];
      this.selectedItem[item.id] = item.value[j];
      this.default[item.id] = item.value[j].id;
      this.onShowCondition.emit(this.selectedItem);
    }

}
