import {Component, OnInit} from '@angular/core';

@Component({templateUrl: 'tree.html'})
export class TreeComponent implements OnInit {
    currNode: any;
    showTip: boolean = false;
    tipMsg: string = '';

    data: any = {
        id: 'aa1',
        name: '禁用节点',
        enabled: false,
        children: [
            {
                id: 'aa2',
                name: 'Test1',
                parentId: 'aa1',
                children: [
                    {id: 'aa21', name: 'Testaa', parentId: 'aa2'},
                    {id: 'aa22', name: 'Test12', parentId: 'aa2'}
                ]
            },
            {
                id: 'aa3',
                name: 'Test2',
                parentId: 'aa1',
                children: [
                    {id: 'aa31', name: 'Test21', parentId: 'aa3'},
                    {id: 'aa32', name: 'Test22', parentId: 'aa3'}
                ]
            }
        ]
    };

    config: any = {search: true};
    operation: any = {action: 'show'};
    operationCheck: any = {action: 'show'};

    treeCode: string = `
    data: any = {
        id: 'aa1',
        name: '禁用节点',
        enabled: false,
        children: [
            {
                id: 'aa2',
                name: 'Test1',
                parentId: 'aa1',
                children: [{
                    id: 'aa21',
                    name: 'Testaa',
                    parentId: 'aa2'
                }, {
                    id: 'aa22',
                    name: 'Test12',
                    parentId: 'aa2'
                }]
            },
            {
                id: 'aa3',
                name: 'Test2',
                parentId: 'aa1',
                children: [{
                    id: 'aa31',
                    name: 'Test21',
                    parentId: 'aa3'
                }, {
                    id: 'aa32',
                    name: 'Test22',
                    parentId: 'aa3'
                }]
            }
        ]
    };

    config: any = {search: true};
    operation: any = {action: 'show'};

    add() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {
            action: 'add',
            node: {
                id: '' + new Date().getTime(),
                parentId: this.currNode.id,
                name: 'New Node'
            }
        };
    }

    edit() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {
            action: 'update',
            node: {
                id: this.currNode.id,
                name: 'Edit Node'
            }
        };
    }

    delete() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {
            action: 'delete',
            node: {
                id: this.currNode.id
            }
        };
    }

    clearSearch() {
        this.operation = {action: 'clear'};
    }

    onClick(node: any) {
        this.currNode = node;
        this.showTip = true;
        this.tipMsg = '您选择节点: ' + node.name;
    }
    `;
    treeHtml: string =
        `<dl-tree [data]="data" [config]="config" [operation]="operation" (onClick)="onClick($event)"></dl-tree>
<div>
            <dl-button [classType]="'primary'" (click)="edit()">编辑</dl-button>
            <dl-button [classType]="'icon'" [i]="'plus'" (click)="add()">增加</dl-button>
            <dl-button [classType]="'warning'" (click)="delete()">删除</dl-button>
            <dl-button [classType]="'operate'" (click)="clearSearch()">清空搜索</dl-button>
</div>`;

    dataCheck: any = {
        id: 'aa1',
        name: '禁用节点',
        enabled: false,
        children: [
            {
                id: 'aa2',
                name: 'Test1',
                parentId: 'aa1',
                children: [
                    {id: 'aa21', name: 'Testaa', parentId: 'aa2'},
                    {id: 'aa22', name: 'Test12', parentId: 'aa2'}
                ]
            },
            {
                id: 'aa3',
                name: 'Test2',
                parentId: 'aa1',
                children: [
                    {id: 'aa31', name: 'Test21', parentId: 'aa3'},
                    {id: 'aa32', name: 'Test22', parentId: 'aa3'}
                ]
            }
        ]
    };

    configCheck: any = {enableCheck: true, checkSingle: true};

    treeCodeCheck: string = `
    dataCheck: any = {
        id: 'aa1',
        name: '禁用节点',
        enabled: false,
        children: [
          {
            id: 'aa2',
            name: 'Test1',
            parentId: 'aa1',
            children: [
              {id: 'aa21', name: 'Testaa', parentId: 'aa2'},
              {id: 'aa22', name: 'Test12', parentId: 'aa2'}
            ]
          },
          {
            id: 'aa3',
            name: 'Test2',
            parentId: 'aa1',
            children: [
              {id: 'aa31', name: 'Test21', parentId: 'aa3'},
              {id: 'aa32', name: 'Test22', parentId: 'aa3'}
            ]
          }
        ]
    };

    configCheck: any = {enableCheck: true, checkSingle: true};
    operationCheck: any = {action: 'show'};

    checkAll() {
        this.operationCheck = {
            action: 'check',
            node: null
        };
    }

    check() {
        this.operationCheck = {
            action: 'check',
            node: ['aa2', 'aa3']
        };
    }

    clearAll() {
        this.operationCheck = {
          action: 'uncheck',
          node: null
        };
    }

    clear() {
        this.operationCheck = {
            action: 'uncheck',
            node: ['aa2', 'aa3']
        };
    }

    onSelect(obj: any) {
        let nodeNames = [];

        if (obj.nodes instanceof Array) {
            for (let node of obj.nodes) {
                nodeNames.push(node.name);
            }
        }
        this.showTip = true;
        this.tipMsg = '您选择节点: ' + nodeNames.join(', ');
    }`;
    treeHtmlCheck: string = `
    <dl-tree [data]="dataCheck" [config]="configCheck" [operation]="operationCheck" (onSelect)="onSelect($event)"></dl-tree>
    <div>
            <dl-button [classType]="'primary'" (click)="checkAll()">选中所有节点</dl-button>
            <dl-button [classType]="'primary'" (click)="check()">选中指定节点(Test1, Test2)</dl-button>
            <dl-button [classType]="'warning'" (click)="clearAll()">清除选中节点</dl-button>
            <dl-button [classType]="'warning'" (click)="clear()">清除指定节点(Test1, Test2)</dl-button> 
    </div>
  `;

    dataDesc: string = `
    {
        id: 'XXX',          //存在增, 删, 改操作时要有
        name: 'XXX',        //必要
        parentId: 'XXX',    //存在删操作时要有
        enabled: true       //默认true, false代表禁用
        //....
    }`;

    configDesc: string = `
    {
        search: true,        //是否显示搜索, 默认false
        enableCheck: true,   //是否显示复选框, 默认false
        checkSingle: true,   //勾选是否不级联
        newStyle: true,      //另一种皮肤, 默认false
        needDefault: true,   //是否默认选中
        selectedId: 'xxxxx'  //选中指定节点ID
    }
    `;

    operationDesc: string = `
    {
        action: 'show | add | delete | update | check | uncheck | clear', //查, 增, 删, 改, 选中, 清除, 清空搜索
        node: {
            id: 'xxxx',
            name: 'xxxx',
            parentId: 'xxxx',
            action: true //删除后, 是否切换到父节点, 默认false
        }   //新增的节点
    }
    `;

    ngOnInit() {
        // null
    }

    add() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {
            action: 'add',
            node: {
                id: '' + new Date().getTime(),
                parentId: this.currNode.id,
                name: 'New Node'
            }
        };
    }

    edit() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {
            action: 'update',
            node: {id: this.currNode.id, name: 'Edit Node'}
        };
    }

    delete() {
        if (!this.currNode) {
            this.showTip = true;
            this.tipMsg = '请选择一个节点';
            return;
        }

        this.operation = {action: 'delete', node: {id: this.currNode.id}};
    }

    clearSearch() {
        this.operation = {action: 'clear'};
    }

    onClick(node: any) {
        this.currNode = node;
        this.showTip = true;
        this.tipMsg = '您选择节点: ' + node.name;
    }

    onSelect(obj: any) {
        let nodeNames = [];

        if (obj.nodes instanceof Array) {
            for (let node of obj.nodes) {
                nodeNames.push(node.name);
            }
        }
        this.showTip = true;
        this.tipMsg = '您选择节点: ' + nodeNames.join(', ');
    }

    checkAll() {
        this.operationCheck = {
            action: 'check',
            node: null
        };
    }

    check() {
        this.operationCheck = {
            action: 'check',
            node: ['aa2', 'aa3']
        };
    }

    clearAll() {
        this.operationCheck = {
            action: 'uncheck',
            node: null
        };
    }

    clear() {
        this.operationCheck = {
            action: 'uncheck',
            node: ['aa2', 'aa3']
        };
    }
}
