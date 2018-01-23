import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarStaticComponent } from './sidebarStatic/sidebarStatic.component';
import { SidebarDynamicComponent } from './sidebarDynamic/sidebarDynamic.component';
import { LeftMenuModule } from '../leftmenu/leftmenu.module';

@NgModule({
    declarations: [
        SidebarStaticComponent,
        SidebarDynamicComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LeftMenuModule
    ],
    exports: [
        SidebarStaticComponent,
        SidebarDynamicComponent
    ]
})

export class SidebarModule {

}