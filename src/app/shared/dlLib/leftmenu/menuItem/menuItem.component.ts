import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dl-menu-item',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menuItem.css'],
    templateUrl: './menuItem.html'

})
export class MenuItemComponent {

    @Input() menuItem:any;
    @Input() child:boolean = false;
    @Input() sidebarCollapsed:boolean = false;

    @Output() itemHover = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();

    constructor(private router:Router) {
    }

    public onHoverItem($event):void {
        this.itemHover.emit($event);
    }

    public onToggleSubMenu($event, item):boolean {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    }

    gotoRouter(routeArray:any) {
        let routerUrl = [];
        routerUrl.push(routeArray[1])
        this.router.navigate(routerUrl);
    }
}
