import { Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dl-sidebar-dynamic',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sidebarDynamic.html'

})
export class SidebarDynamicComponent {
    public menuHeight:number;
    public isMenuCollapsed:boolean = false;
    public isMenuShouldCollapsed:boolean = false;


    constructor(public router:Router,
                private _elementRef:ElementRef, private _state:GlobalState) {

        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public ngOnInit():void {
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
    }

    public ngAfterViewInit():void {
        setTimeout(() => this.updateSidebarHeight());
    }

    @HostListener('window:resize')
    public onWindowResize():void {

        var isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
    }

    public menuExpand():void {
        this.menuCollapseStateChange(false);
    }

    public menuCollapse():void {
        this.menuCollapseStateChange(true);
    }

    public menuCollapseStateChange(isCollapsed:boolean):void {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    public updateSidebarHeight():void {
        // TODO: get rid of magic 84 constant
        this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
    }

    private _shouldMenuCollapse():boolean {
        //return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
        return window.innerWidth <= 1200;
    }

    toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('isCollapsed', this.isMenuCollapsed);
        return false;
    }
}
