import { Component } from '@angular/core';

@Component({
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent {
  links: any[] = [
    {
      active: false,
      text: 'input',
      url: 'main/components/input'
    },
    {
      active: false,
      text: 'button',
      url: 'main/components/button'
    },
    {
      active: true,
      text: 'breadcrumb'
    }
  ];
  breadcrumbCode: string = `
   <dl-breadcrumb [links]="links"></dl-breadcrumb>`;
}
