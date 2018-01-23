import { Component, OnInit } from '@angular/core';
import { GlobalState } from './global.state';

@Component({
  selector: 'app',
  template: `
	<main [ngClass]="{'menu-collapsed': isCollapsed, 'topMenu-selected': selectedTopMenu}">
		<router-outlet></router-outlet>
	</main>`,
})
export class AppComponent {
	isCollapsed:boolean = false;

	constructor(private globalState:GlobalState) {

		this.globalState.subscribe('isCollapsed', collapsed => {
			this.isCollapsed = collapsed;
		});

	}

	ngOnInit() {
  		//用require动态加载的外部JS
  		require("../custom.js");
  	}
}
