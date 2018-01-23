import { Component } from '@angular/core';
import { DemoService } from './demo.service';


@Component({
    templateUrl: './demo.component.html'
})

export class DemoComponent {
    isCollapsed:boolean = false;
    switchSidebar:string = 'home';

    constructor(private demoService:DemoService) {
        //this.demoService.configMenu();
    }

    collapse(e:any) {
        this.isCollapsed = e;
    }

    switch(e:any) {
        this.switchSidebar = e;
    }
}