import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dl-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent {
  @Input() links:any[];

  constructor(private router:Router) {
    this.links = [];
  }

  toUrl(url:string) {
    this.router.navigate([url]);
  }
}