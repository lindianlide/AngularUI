import { Component } from '@angular/core';

@Component({
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.css']
})

export class TagComponent {
    conditionData:any[];
    default:any;
    tagCode:string;
    operateCode:string;

    constructor() {
        this.tagCode = `
      this.conditionData = [
      {
        id: 'resourceType',
        name: '类型',
        value: [
          { id: '1', name:  '类型1'},
          { id: '2', name: '类型2'},
          { id: '3', name: '类型3'},
          { id: '4', name: '类型4'}
        ]}, {
        id: 'status',
        name:  '状态',
        value: [
          { id: '1', name:  '状态1'},
          { id: '2', name: '状态2'},
          { id: '3', name: '状态3'}
        ]
      }];
      
      <dl-tag [data]="conditionData"  [default]="default" (onShowCondition)="onShowCondition($event)"></dl-tag>
      `;

        this.operateCode = `<dl-tag [data]="conditionData"  [default]="default" (onShowCondition)="onShowCondition($event)"></dl-tag>`;

        this.conditionData = [
            {
                id: 'resourceType',
                name: '类型',
                value: [
                    {id: '1', name: '类型1'},
                    {id: '2', name: '类型2'},
                    {id: '3', name: '类型3'},
                    {id: '4', name: '类型4'},
                    {id: '5', name: '类型5'},
                    {id: '6', name: '类型6'},
                    {id: '7', name: '类型7'},
                    {id: '8', name: '类型8'},
                    {id: '9', name: '类型9'},
                    {id: '10', name: '类型10'},
                    {id: '11', name: '类型11'},
                    {id: '12', name: '类型12'},
                    {id: '13', name: '类型13'},
                    {id: '14', name: '类型14'},
                    {id: '15', name: '类型15'},
                    {id: '16', name: '类型16'},
                    {id: '17', name: '类型17'},
                    {id: '18', name: '类型18'},
                    {id: '19', name: '类型19'}
                ]
            }, {
                id: 'status',
                name: '状态',
                value: [
                    {id: '1', name: '状态1'},
                    {id: '2', name: '状态2'},
                    {id: '3', name: '状态3'},
                    {id: '4', name: '状态4'},
                    {id: '5', name: '状态5'},
                    {id: '6', name: '状态6'},
                    {id: '7', name: '状态7'},
                    {id: '8', name: '状态8'},
                ]
            }];

        this.default = {'resourceType': '1', 'status': '1'};
    }

    onShowCondition(condition:any) {
        console.log(condition);
    }
}
