import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dl-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {

  @Output() collapse = new EventEmitter();
  @Output() switchSidebar = new EventEmitter();
  switchValue:string = 'home';
  isCollapsed:boolean = false;

  collapseSidebar(e:any) {
    this.isCollapsed = !this.isCollapsed;
    this.collapse.emit(this.isCollapsed);
  }

  switch(value:string) {
    this.switchValue = value;
    this.switchSidebar.emit(value);
  }
}