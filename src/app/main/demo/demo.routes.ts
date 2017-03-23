import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from '../demo/demo.component';
import { ButtonComponent } from '../demo/button/button.component';
import { InputComponent } from '../demo/input/input.component';
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
      }
    ]
  }
];

