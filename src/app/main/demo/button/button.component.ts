import { Component } from '@angular/core';

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})

export class ButtonComponent {
  iconCode: string;
  combiCode: string;
  operateCode: string;
  constructor() {
    this.iconCode = `
      <dl-button [classType]="'icon'" [i]="'plus'">创建</dl-button>
      <dl-button [classType]="'icon'" [i]="'plus'" [disabled]="true">创建</dl-button>
      <dl-button [classType]="'icon'" [i]="'download'">下载</dl-button>
      <dl-button [classType]="'icon'" [i]="'download'" [disabled]="true">下载</dl-button>
      <dl-button [classType]="'icon'" [i]="'upload'">导出</dl-button>
      <dl-button [classType]="'icon'" [i]="'upload'" [disabled]="true">导出</dl-button>`;

    this.combiCode = `
      <dl-button [classType]="'primary'">确认</dl-button>
      <dl-button [classType]="'cancel'">取消</dl-button>
      <dl-button [classType]="'warning'">删除</dl-button>
      <dl-button [classType]="'cancel'">取消</dl-button>
      <dl-button [classType]="'primary'" [disabled]="true">确认</dl-button>
      <dl-button [classType]="'cancel'" [disabled]="true">取消</dl-button>
      <dl-button [classType]="'warning'" [disabled]="true">删除</dl-button>
      <dl-button [classType]="'cancel'" [disabled]="true">取消</dl-button>`;

    this.operateCode = `<dl-button [classType]="'operate'">编辑</dl-button>`;
  }
}
