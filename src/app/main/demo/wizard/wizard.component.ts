import { Component } from '@angular/core';

@Component({
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})

export class WizardComponent {
  wizardCode: string;
  createSteps = [
    {title:'1.第一步',validate:true},
    {title:'2.第二步',validate:true},
    {title:'3.第三步',validate:true}
  ]
  constructor() {
    this.wizardCode = `
    <dl-wizard (submit)="submit()">
      <dl-wizard-step [current]="true">
          1
      </dl-wizard-step>
      <dl-wizard-step>
          2
      </dl-wizard-step>
      <dl-wizard-step>
          3
      </dl-wizard-step>
  </dl-wizard>`;

  }
}
