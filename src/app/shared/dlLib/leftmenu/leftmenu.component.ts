import { Component, ViewEncapsulation, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { LeftMenuService } from './leftmenu.service';
import { GlobalState } from '../../../global.state';
import * as _ from 'lodash';

import $ from 'jquery';

@Component({
    selector: 'dl-leftmenu',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './leftmenu.html'
})
export class LeftMenuComponent {

    @Input() sidebarCollapsed:boolean = false;
    @Input() menuHeight:number;

    @Output() expandMenu = new EventEmitter<any>();

    public menuItems:any[];
    protected _menuItemsSub:Subscription;
    public showHoverElem:boolean;
    public hoverElemHeight:number;
    public hoverElemTop:number;
    protected _onRouteChange:Subscription;
    public outOfArea:number = -200;
    public selectedTopMenu:string;
    
    showSelect: boolean = false;

    constructor(private _router:Router, private _service:LeftMenuService, private _state:GlobalState) {
        this.selectedTopMenu = 'console';
        this._onRouteChange = this._router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (this.menuItems) {
                    this.selectMenuAndNotify();
                } else {
                    // on page load we have to wait as event is fired before menu elements are prepared
                    setTimeout(() => this.selectMenuAndNotify());
                }
            }

        });

        this._menuItemsSub = this._service.menuItems.subscribe(this.updateMenu.bind(this));
    }

    public updateMenu(newMenuItems) {
        this.menuItems = newMenuItems;
        this.selectMenuAndNotify();
    }

    public selectMenuAndNotify():void {
        if (this.menuItems) {
            this.menuItems = this._service.selectMenuItem(this.menuItems);

            let that = this;
            _.each(that.menuItems,function(items){
                if(items.children){
                    _.each(items.children,function(item){
                        if(that._router.url.indexOf(item.route.paths[1]) !== -1){
                            item.selected = true;
                            items.selected = true;
                        }
                    });
                }
            });
          this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());

          this.selectedTopMenu = this._service.getCurrentItem().name;
          this._state.notifyDataChanged('menu.activeTopMenu', this.selectedTopMenu);
        }
    }

    public ngOnInit():void {

    }

    ngAfterViewInit(){

    }

    public ngOnDestroy():void {
        this._onRouteChange.unsubscribe();
        this._menuItemsSub.unsubscribe();
    }

    //滑动效果。html已删除调用
    public hoverItem($event):void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        // TODO: get rid of magic 66 constant
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 60;
    }

    public toggleSubMenu($event):boolean {
        var submenu = $($event.currentTarget).next();
        if (this.sidebarCollapsed) {
            this.expandMenu.emit(null);
            if (!$event.item.expanded) {
                $event.item.expanded = true;
            }
        } else {
            $event.item.expanded = !$event.item.expanded;
            submenu.slideToggle();
        }

        return false;
    }
}
