import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';
import { LeftMenuModule } from './leftmenu/leftmenu.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';
import { WizardModule } from './wizard/wizard.module';
import { UploadModule } from './upload/upload.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { NoticeModule } from './notice/notice.module';
import { ModalModule } from './modal/modal.module';
import { ProgressModule } from './progress/progress.module';
import { LoadingModule } from './loading/loading.module';
import { DlTreeModule } from './tree/tree.module';
import { TagModule } from './tag/tag.module';

const module = [
    NavbarModule,
    LeftMenuModule,
    SidebarModule,
    InputModule,
    ButtonModule,
    WizardModule,
    UploadModule,
    BreadcrumbModule,
    NoticeModule,
    ModalModule,
    ProgressModule,
    LoadingModule,
    DlTreeModule,
    TagModule
];

@NgModule({
    imports: module,
    exports: module
})

export class DlLibModule {

}
