import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DemoComponent } from './demo.component';
import { DemoRoutes } from './demo.routes';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { WizardComponent } from './wizard/wizard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NoticeComponent } from './notice/notice.component';
import { ModalComponent } from './modal/modal.component';
import { ProgressComponent } from './progress/progress.component';
import { TreeComponent } from './tree/tree.component';
import { TagComponent } from './tag/tag.component';
import { DemoService } from './demo.service';

@NgModule({
  declarations: [
    DemoComponent,
    ButtonComponent,
    InputComponent,
    WizardComponent,
    BreadcrumbComponent,
    NoticeComponent,
    ModalComponent,
    ProgressComponent,
    TreeComponent,
    TagComponent
  ],
  providers:[DemoService],
  imports: [
    SharedModule,
    RouterModule.forChild(DemoRoutes)
  ]
})

export class DemoModule {
}
