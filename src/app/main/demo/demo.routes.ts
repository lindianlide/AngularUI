import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { WizardComponent } from './wizard/wizard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NoticeComponent } from './notice/notice.component';
import { ModalComponent } from './modal/modal.component';
import { ProgressComponent } from './progress/progress.component';

export const DemoRoutes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'button',
        pathMatch: 'full'
      },
      {
        path: 'button',
        component: ButtonComponent
      },
      {
        path: 'input',
        component: InputComponent
      },
      {
        path: 'wizard',
        component: WizardComponent
      },
      {
        path: 'breadcrumb',
        component: BreadcrumbComponent
      },
      {
        path: 'notice',
        component: NoticeComponent
      },
      {
        path: 'modal',
        component: ModalComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      }
    ]
  }
];

