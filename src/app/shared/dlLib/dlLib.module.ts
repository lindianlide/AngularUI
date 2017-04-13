import { NgModule } from '@angular/core';
import { NavbarModule } from './navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';
import { WizardModule } from './wizard/wizard.module';
import { UploadModule } from './upload/upload.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { NoticeModule } from './notice/notice.module';

const module = [
  NavbarModule,
  SidebarModule,
  InputModule,
  ButtonModule,
  WizardModule,
  UploadModule,
  BreadcrumbModule,
  NoticeModule
];

@NgModule({
  imports: module,
  exports: module
})

export class DlLibModule {

}
