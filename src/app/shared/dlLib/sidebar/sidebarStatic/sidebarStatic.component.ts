import { Component, Input } from '@angular/core';

@Component({
  selector: 'dl-sidebar-static',
  templateUrl: './sidebarStatic.component.html'
})

export class SidebarStaticComponent {
  isVisible:boolean = false;

  @Input() isCollapsed:boolean;
  @Input() switchSidebar:string;
}