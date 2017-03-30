import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
	ngOnInit() {
  		//用require动态加载的外部JS
  		require("../custom.js");
  	}
}
