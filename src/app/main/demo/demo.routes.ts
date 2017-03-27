import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { WizardComponent } from './wizard/wizard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
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
      }
    ]
  }
];

