import $ from './ztree/jquery-vendor.js';
import './ztree/jquery.ztree.core.min.js';
import './ztree/jquery.ztree.excheck.min.js';
import './ztree/jquery.ztree.exedit.min.js';
import './ztree/jquery.ztree.exhide.min.js';

import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'dl-tree',
  templateUrl: './tree.component.html'
})
export class TreeComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: any = {};
  @Input() config: any = {};
  @Input() operation: any = {action: 'show'};
  @Output() onSelect = new EventEmitter<any>();
  @Output() onClick = new EventEmitter<any>();
  treeId: string;
  settings: any = null;
  keyFilter: string = '';

  //_data: any = null;

  constructor() {
    // null
  }

  ngOnChanges(changes: SimpleChanges) {
    let operationAction = this.operation.action;

    switch (operationAction) {
      case 'show':
        if (this.treeId) {
          this.show();
        }

        break;
      case 'add':
        this.add(this.operation.node);
        break;
      case 'delete':
        this.delete(this.operation.node);
        break;
      case 'update':
        this.update(this.operation.node);
        break;
      case 'check':
        this.check(this.operation.node, true);
        break;
      case 'uncheck':
        this.check(this.operation.node, false);
        break;
      case 'clear':
        this.clear();
        break;
      default:
        return;
    }
  }

  // init the tree configuration according to the param
  ngOnInit() {
    if (this.config.enableCheck) {
      this.settings = {
        view: {showIcon: false},
        check: {
          enable: true,
          chkboxType: this.config.checkSingle ? {'Y': '', 'N': ''} :
          {'Y': 'ps', 'N': 'ps'}
        },
        callback: {
          onCheck: (event, treeId, treeNode) => {
            let zTree = $.fn.zTree.getZTreeObj(treeId);
            this.onSelect.emit(
                {node: treeNode, nodes: zTree.getCheckedNodes()});
          }
        }
      };
    } else {
      this.settings = {
        view: {showIcon: false},
        callback: {
          onClick: (event, treeId, treeNode, clickFlag) => {
            this.onClick.emit(treeNode);
          }
        }
      };
    }
  }

  // refresh the tree when the data changed, Such as add, delete, edit..
  /*
   ngDoCheck() {
   if (this.treeId && this.settings && $('#' + this.treeId).length > 0 &&
   this._data && !_.isEqual(this.data, this._data)) {
   this._data = this.deepClone(this.data);
   this.show();
   }
   }
   */

  // page load complete
  ngAfterViewInit() {
    this.treeId = 'tree-' + new Date().getTime();
    $('#tree-component').attr('id', this.treeId);

    if (this.data) {
      if (this.data instanceof Array) {
        if (this.data[0] && this.data[0].name) {
          this.show();
        }
      } else {
        if (this.data.name) {
          this.show();
        }
      }
    }
  }

  add(node: any) {
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let nodes = [];
    let parentId = '';

    if (node instanceof Array) {
      nodes = node;
    } else {
      nodes = [node];
    }

    parentId = nodes[0].parentId;

    if (parentId) {
      let parentNode = zTree.getNodeByParam('id', parentId, null);
      zTree.addNodes(parentNode, nodes);
    } else {
      zTree.addNodes(null, nodes);
    }

    for (let currentNode of nodes) {
      let currNode = zTree.getNodeByParam('id', currentNode.id, null);
      currentNode.enabled = true;

      $('#' + currNode.tId + '_a').click(() => {
        this.onClick.emit(currentNode);
      });
    }
  }

  delete(node: any) {
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let currNode = zTree.getNodeByParam('id', node.id, null);
    zTree.removeNode(currNode);

    if (node.parentId && node.action) {
      let parentNode = zTree.getNodeByParam('id', node.parentId, null);
      let $aId = parentNode.tId + '_a';
      $('#' + $aId).click();
    }
  }

  update(node: any) {
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let currNode = zTree.getNodeByParam('id', node.id, null);
    currNode.name = node.name;
    zTree.updateNode(currNode);
  }

  // show tree data
  show() {
    if (this.config.newStyle) {
      $('#' + this.treeId).addClass('newStyle');
    } else {
      $('.zte-tree').removeClass('zte-tree');
      $('#' + this.treeId).addClass('defaultStyle');
    }

    $.fn.zTree.init($('#' + this.treeId), this.settings, this.data);
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);

    // expand all nodes when page load completed
    zTree.expandAll(true);

    // disabled some nodes
    let disabledNodes = zTree.getNodesByParam('enabled', false);

    if (disabledNodes && disabledNodes.length > 0) {
      let $LI = null;

      for (let disabledNode of disabledNodes) {
        $LI = $('#' + disabledNode.tId);

        if (this.config.enableCheck) {
          $LI.addClass('checkable');
        }

        $LI.addClass('disabled');
      }
    }

    if (this.config.needDefault) {
      if (!this.config.selectedId) {
        // To find the first enabled node
        if (this.data instanceof Array) {
          for (let node of this.data) {
            const flag = this.setDefaultNode(node);

            if (flag) {
              break;
            }
          }
        } else {
          this.setDefaultNode(this.data);
        }
      }

      if (this.config.selectedId) {
        let selectedNode =
            zTree.getNodeByParam('id', this.config.selectedId, null);
        let $aId = selectedNode.tId + '_a';
        $('#' + $aId).click();
      }
    }
  }

  clear() {
    if (this.config.search) {
      this.keyFilter = '';
      let zTree = $.fn.zTree.getZTreeObj(this.treeId);
      let hideNodes = zTree.getNodesByParam('isHidden', true);
      zTree.showNodes(hideNodes);
    }
  }

  check(node: any, type: boolean) {
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let selectedNode = null;

    if (node === null) {
      zTree.checkAllNodes(type);
    } else if (node instanceof Array) {
      for (let nodeId of node) {
        selectedNode = zTree.getNodeByParam('id', nodeId, null);
        zTree.checkNode(selectedNode, type, false);
      }
    } else {
      selectedNode = zTree.getNodeByParam('id', node.id, null);
      zTree.checkNode(selectedNode, type, false);
    }
  }

  /*
   deepClone(object: any) {
   let clone = _.clone(object);

   _.each(clone, (value, key) => {
   if (_.isObject(value)) {
   clone[key] = this.deepClone(value);
   }
   });

   return clone;
   }
   */

  setDefaultNode(rootNode: any) {
    const node = rootNode;

    if (node.enabled) {
      this.config.selectedId = node.id;
      return true;
    }

    const childNodes = node.children;

    if (childNodes) {
      for (let childNode of childNodes) {
        const flag = this.setDefaultNode(childNode);

        if (flag) {
          break;
        }
      }
    }
  }

  keyChanged(value: string) {
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let hideNodes = zTree.getNodesByParam('isHidden', true);
    zTree.showNodes(hideNodes);
    let toHideNodes = zTree.getNodesByFilter(
        (node) => !(node.name && node.name.toLowerCase().indexOf(value.toLowerCase()) > -1));

    if (toHideNodes && toHideNodes.length > 0) {
      for (let node of toHideNodes) {
        if (this.needHide(node, value)) {
          zTree.hideNode(node);
        }
      }
    }
  }

  needHide(node: any, value: string) {
    let flag = true;
    let zTree = $.fn.zTree.getZTreeObj(this.treeId);
    let nodes = zTree.getNodesByParamFuzzy('name', value, node);

    if (nodes && nodes.length > 0) {
      return false;
    }

    let nodeList = zTree.getNodesByParamFuzzy('name', value);

    if (nodeList && nodeList.length > 0) {
      for (let parentNode of nodeList) {
        nodes = zTree.getNodesByParam('id', node.id, parentNode);

        if (nodes && nodes.length > 0) {
          return false;
        }
      }
    }

    return flag;
  }
}
