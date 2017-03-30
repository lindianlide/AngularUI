import { Component, Input } from '@angular/core';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'dl-sidebar-static',
  templateUrl: './sidebarStatic.component.html'
})

export class SidebarStaticComponent {
  isVisible: boolean = false;

  isCollapsed: boolean = false;
  @Input() switchSidebar: string;

  constructor(private globalState: GlobalState) {
    this.globalState.subscribe('isCollapsed', collapsed => {
      this.isCollapsed = collapsed;
    });
  }
}
