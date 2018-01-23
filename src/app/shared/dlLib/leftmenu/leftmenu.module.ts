import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftMenuComponent } from './leftmenu.component';
import { MenuItemComponent } from './menuItem/menuItem.component';
import { LeftMenuService } from './leftmenu.service';

@NgModule({
    declarations: [
        LeftMenuComponent,
        MenuItemComponent
    ],
    providers: [LeftMenuService],
    imports: [
        CommonModule,
    ],
    exports: [
        LeftMenuComponent,
        MenuItemComponent
    ]
})

export class LeftMenuModule {

}
