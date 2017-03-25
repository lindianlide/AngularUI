import { Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'dl-wizard-step',
    styleUrls: ['./wizard.scss'],
    templateUrl: './wizardStep.component.html'

})
export class WizardStepComponent {
    @Input() steps:any = [];
    @Input() current:boolean = false;

    constructor(private _elementRef:ElementRef) {

    }

}

