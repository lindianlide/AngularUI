import { Component } from '@angular/core';

@Component({
  templateUrl: './demo.component.html'
})

export class DemoComponent {
 isCollapsed:boolean = false;
  switchSidebar:string = 'home';

  collapse(e:any) {
    this.isCollapsed = e;
  }

  switch(e:any) {
    this.switchSidebar = e;
  }
}