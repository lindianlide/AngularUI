import { Component, Output, EventEmitter } from '@angular/core';
import { GlobalState } from '../../../global.state';
@Component({
  selector: 'dl-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {

  @Output() switchSidebar = new EventEmitter();
  switchValue: string = 'home';
  isCollapsed: boolean = false;

  constructor(private globalState: GlobalState) {
  }

  collapseSidebar(e: any) {
    this.isCollapsed = !this.isCollapsed;
    this.globalState.notifyDataChanged('isCollapsed', this.isCollapsed);
  }

  switch(value: string) {
    this.switchValue = value;
    this.switchSidebar.emit(value);
  }
}
