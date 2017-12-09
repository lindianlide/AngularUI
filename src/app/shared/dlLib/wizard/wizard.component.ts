import { Component, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dl-wizard',
    styleUrls: ['./wizard.css'],
    templateUrl: './wizard.component.html'

})
export class WizardComponent {
    //@Input() steps:any = [];
    _steps:any;
    @Input()
    set steps(steps:any) {
        this._steps = steps;
    }

    get steps() {
        return this._steps;
    }

    @Output() submit = new EventEmitter<boolean>();
    @Output() next = new EventEmitter<number>();
    @Output() prev = new EventEmitter<number>();
    @Output() cancel = new EventEmitter<boolean>();
    @ViewChild('stepsDom') stepsDom:any;

    preShow:boolean = true;
    completeShow:boolean = true;
    nextShow:boolean = false;
    tabs:any = [];
    tab = {
        title: '',
        select: '',
        submit: '',
        isComplete: '',
        isAvailiable: '',
        prevTab: '',
        setPrev: ''
    };
    tabNum = 0;

    constructor(private _elementRef:ElementRef) {

    }

    ngOnInit() {
        let that = this;
        that.tabs = [];
        for (let step of that.steps) {
            that.tab.title = step.title;
            that.addTab(that.tab);
        }
    }

    /* ngAfterViewInit() {
     this.stepsDom.nativeElement.children[0].hidden = false;
     }*/

    addTab(tab:any) {
        this.tabs.push(tab);
        //this.selectTab(0);
    };

    selectTab(tabNum:any) {
        //this.tabs[this.tabNum].submit();
        if (this.tabs[tabNum].isAvailiable()) {
            this.tabNum = tabNum;
            this.tabs.forEach(function (t:any, tIndex:any) {
                tIndex == this.tabNum ? t.select(true) : t.select(false);
            });
        }
    };

    nextStep() {
        //this.stepsDom.nativeElement.children[0].childNodes[0].children[0].name
        /* let formValue = this.stepsDom.form.value;
         let submitValue = {};

         for (let key in formValue) {
         {
         submitValue[key] = formValue[key];
         }
         }*/
        //this.steponeForm.form.value;
        let that = this;
        this.next.emit(that.tabNum);
        if (this.steps[this.tabNum].validate) {
            this.preShow = false;
            this.tabNum++;
            if (this.tabNum === this.tabs.length - 1) {
                this.nextShow = true;
                this.completeShow = false;
            }
            for (let i = 0; i < this.tabs.length; i++) {
                this.stepsDom.nativeElement.children[i].childNodes[0].hidden = true;
            }
            this.stepsDom.nativeElement.children[this.tabNum].childNodes[0].hidden = false;
        }
    }

    preStep() {
        let that = this;
        this.prev.emit(that.tabNum);
        this.tabNum--;
        this.completeShow = true;
        this.nextShow = false;
        if (this.tabNum === 0) {
            this.preShow = true;
        }
        for (let i = 0; i < this.tabs.length; i++) {
            this.stepsDom.nativeElement.children[i].childNodes[0].hidden = true;
        }
        this.stepsDom.nativeElement.children[this.tabNum].childNodes[0].hidden = false;
    }

    submitForm() {
        this.submit.emit(false);
    }

    cancelForm() {
        this.cancel.emit(false);
    }

    select(isSelected:any) {
        if (isSelected) {
            //$scope.selected = true;
        } else {
            //$scope.selected = false;
        }
    }

    isComplete() {
        //return $scope.form ? $scope.form.$valid : true;
    }

    isAvailiable() {
        //return this.tab.prevTab ? this.tab.prevTab.isComplete() : true;
    }

    setPrev(pTab:any) {
        this.tab.prevTab = pTab;
    }
}
