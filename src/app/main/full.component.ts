import { Component } from '@angular/core';
import { GlobalState } from '../global.state';

@Component({
  templateUrl: './full.component.html'
})

export class FullComponent {
  isCollapsed: boolean = false;
  switchSidebar: string = 'home';

  constructor(private globalState: GlobalState) {
    this.globalState.subscribe('isCollapsed', collapsed => {
      this.isCollapsed = collapsed;
    });
  }

  switch(e: any) {
    this.switchSidebar = e;
  }
}
