import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, HostBinding} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DomHandler} from '../dom/domhandler';

@Directive({selector: '[dlButton]', providers: [DomHandler]})
export class dlButtonDirective implements AfterViewInit, OnDestroy {
  @Input() iconPos: string = 'left';

  @Input() cornerStyleClass: string = 'ui-corner-all';

  @HostBinding('attr.name') @Input() name: string = null;

  _label: string;

  _loadinglabel: string;

  _icon: string;

  _state: number;

  initialized: boolean;

  constructor(
      public el: ElementRef, public domHandler: DomHandler,
      public translateService: TranslateService) {}

  ngAfterViewInit() {
    this.domHandler.addMultipleClasses(
        this.el.nativeElement, this.getStyleClass());//el当前元素 即父button
    if (this.icon) {
      let iconElement = document.createElement('span');
      let iconPosClass = (this.iconPos === 'right') ? 'ui-button-icon-right' :
                                                      'ui-button-icon-left';
      iconElement.className = iconPosClass + ' ui-c font-paletx dl-' + this.icon;
      this.el.nativeElement.appendChild(iconElement);
    }

    let iconAnimationElement = document.createElement('span');
    iconAnimationElement.className =
        'ui-button-icon-left ui-c font-paletx dl-circle-o-notch dl-spin';
    iconAnimationElement.style.display = 'none';
    this.el.nativeElement.appendChild(iconAnimationElement);

    let labelElement = document.createElement('span');
    labelElement.className = 'ui-button-text ui-c';
    labelElement.appendChild(document.createTextNode(this.label || ''));
    this.el.nativeElement.appendChild(labelElement);

    if (this.state) {
      let spanElement =
          this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text');
      if (this.state === dlButtonState.DOING) {
        if (spanElement) {
          spanElement.innerText = this.loadinglabel || 'loading';
        }
        this.el.nativeElement.disabled = true;
        this.setIconELement(true);
      } else {
        spanElement.innerText = this.label || '';
        this.el.nativeElement.disabled = false;
        this.setIconELement(false);
      }
    }

    this.initialized = true;
  }

  getStyleClass(): string {
    let styleClass =
        'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
    if (this.icon) {
      if (this.label != null && this.label != undefined) {
        if (this.iconPos === 'left') {
          styleClass = styleClass + ' ui-button-text-icon-left';
        } else {
          styleClass = styleClass + ' ui-button-text-icon-right';
        }
      } else {
        styleClass = styleClass + ' ui-button-icon-only';
      }
    } else {
      styleClass = styleClass + ' ui-button-text-only';
    }

    return styleClass;
  }

  setIconELement(isShowAnimation: boolean) {
    let iconLeftElement = this.domHandler.findSingle(
        this.el.nativeElement, '.ui-button-icon-left.font-paletx');
    if (iconLeftElement) {
      iconLeftElement.style.display = isShowAnimation ? 'none' : 'inline-block';
    }
    let iconRightElement = this.domHandler.findSingle(
        this.el.nativeElement, '.ui-button-icon-left.font-paletx');
    if (iconRightElement) {
      iconRightElement.style.display =
          isShowAnimation ? 'none' : 'inline-block';
    }
    let iconAnimationElement = this.domHandler.findSingle(
        this.el.nativeElement, '.font-paletx.dl-circle-o-notch.dl-spin');
    if (iconAnimationElement) {
      iconAnimationElement.style.display =
          isShowAnimation ? 'inline-block' : 'none';
    }
  }

  @Input()
  get label(): string {
    return this._label;
  }

  set label(val: string) {
    let buttonLabel: string = val ? this.translateService.instant(val) : '';
    this._label = buttonLabel;

    if (this.initialized) {
      this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text')
          .textContent = this._label;
    }
  }

  @Input()
  get loadinglabel(): string {
    return this._loadinglabel;
  }

  set loadinglabel(val: string) {
    let buttonloadingLabel: string = this.translateService.instant(val);
    this._loadinglabel = buttonloadingLabel;
  }

  @Input()
  get icon(): string {
    return this._icon;
  }

  set icon(val: string) {
    this._icon = val;

    if (this.initialized) {
      let iconPosClass = (this.iconPos === 'right') ? 'ui-button-icon-right' :
                                                      'ui-button-icon-left';
      this.domHandler.findSingle(this.el.nativeElement, '.font-paletx').className =
          iconPosClass + ' ui-c font-paletx dl-' + this.icon;
    }
  }

  @Input()
  get state(): number {
    return this._state;
  }

  set state(val: number) {
    this._state = val;
    if (this.initialized) {
      let spanElement =
          this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text');
      if (this.state === dlButtonState.DOING) {
        if (spanElement) {
          spanElement.innerText = this.loadinglabel || 'loading';
        }
        this.el.nativeElement.disabled = true;
        this.setIconELement(true);
      } else {
        spanElement.innerText = this.label || '';
        this.el.nativeElement.disabled = false;
        this.setIconELement(false);
      }
    }
  }

  ngOnDestroy() {
    while (this.el.nativeElement.hasChildNodes()) {
      this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
    }

    this.initialized = false;
  }
}
