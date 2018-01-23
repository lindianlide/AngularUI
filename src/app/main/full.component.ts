import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalState } from '../global.state';
import { FullService } from './full.service';
@Component({
    templateUrl: './full.component.html'
})

export class FullComponent {
    isCollapsed:boolean = false;
    switchSidebar:string = 'home';

    constructor(private globalState:GlobalState, private fullService:FullService, public router:Router) {
        this.globalState.subscribe('isCollapsed', collapsed => {
            this.isCollapsed = collapsed;
        });

        this.fullService.configMenu();
    }

    switch(e:any) {
        this.switchSidebar = e;
    }
}
