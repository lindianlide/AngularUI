import { Injectable } from '@angular/core';

@Injectable()
export class DomHandler {

    static zindex: number = 2000;

    private calculatedScrollbarWidth: number = null;

    addClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    addMultipleClasses(element: any, className: string): void {
        const styles: string[] = className.split(' ');
        for (const style of styles) {
            this.addClass(element, style);

        }
    }

    removeClass(element: any, className: string): void {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    hasClass(element: any, className: string): boolean {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    siblings(element: any): any {
        return Array.prototype.filter.call(element.parentNode.children, (child: any) => {
            return child !== element;
        });
    }

    find(element: any, selector: string): any[] {
        return element.querySelectorAll(selector);
    }

    findSingle(element: any, selector: string): any {
        return element.querySelector(selector);
    }

    index(element: any): number {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (const childNode of children) {
            if (childNode === element) { return num; }
            if (childNode.nodeType === 1) { num++; }
        }
        return -1;
    }

    relativePosition(element: any, target: any): void {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        let targetHeight = target.offsetHeight;
        let targetWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        // let windowScrollTop = this.getWindowScrollTop();
        let viewport = this.getViewport();
        let top: number = 0;
        let left: number = 0;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            if (targetOffset.top + top < 0) {
                top = 0;
            }
        } else {
            top = targetHeight;
        }


        if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            left = targetWidth - elementDimensions.width;
        } else {
            left = 0;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    absolutePosition(element: any, target: any): void {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth = elementDimensions.width;
        let targetOuterHeight = target.offsetHeight;
        let targetOuterWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = this.getWindowScrollTop();
        let windowScrollLeft = this.getWindowScrollLeft();
        let viewport = this.getViewport();
        let top;
        let left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = 0 + windowScrollTop;
            }
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
        } else {
            left = targetOffset.left + windowScrollLeft;
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    getHiddenElementOuterHeight(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementHeight;
    }

    getHiddenElementOuterWidth(element: any): number {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return elementWidth;
    }

    getHiddenElementDimensions(element: any): any {
        let dimensions: any = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';

        return dimensions;
    }

    scrollInView(container: any, item: any) {
        let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item);

        if (offset < 0) {
            container.scrollTop = scroll + offset;
        } else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }

    fadeIn(element: any, duration: number): void {
        element.style.opacity = 0;

        let last = +new Date();
        let opacity = 0;
        let tick = () => {
            opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();

            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    fadeOut(element, ms) {
        let opacity = 1,
            interval = 50,
            duration = ms,
            gap = interval / duration;

        let fading = setInterval(() => {
            opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }

            element.style.opacity = opacity;
        }, interval);
    }

    getWindowScrollTop(): number {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }

    getWindowScrollLeft(): number {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }

    matches(element, selector: string): boolean {
        let p = Element.prototype;
        let f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p.msMatchesSelector || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(element, selector);
    }

    getOuterWidth(el, margin?) {
        let width = el.offsetWidth;

        if (margin) {
            let style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }

        return width;
    }

    getHorizontalPadding(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }

    getHorizontalMargin(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    innerWidth(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }

    width(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }

    getInnerHeight(el) {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);

        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }

    getOuterHeight(el, margin?) {
        let height = el.offsetHeight;

        if (margin) {
            let style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }

        return height;
    }

    getHeight(el): number {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);

        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

        return height;
    }

    getWidth(el): number {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);

        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

        return width;
    }

    getViewport(): any {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return { width: w, height: h };
    }

    getOffset(el) {
        let rect = el.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }

    getUserAgent(): string {
        return navigator.userAgent;
    }

    isIE() {
        let ua = window.navigator.userAgent;

        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }

        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            // var rv = ua.indexOf('rv:');
            return true;
        }

        let edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // Edge (IE 12+) => return version number
           return true;
        }

        // other browser
        return false;
    }

    appendChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.appendChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.appendChild(element);
             } else {
            throw 'Cannot append ' + target + ' to ' + element;
             }
    }

    removeChild(element: any, target: any) {
        if (this.isElement(target)) {
            target.removeChild(element);
        } else if (target.el && target.el.nativeElement) {
            target.el.nativeElement.removeChild(element);
             } else {
            throw 'Cannot remove ' + element + ' from ' + target;
             }
    }

    isElement(obj: any) {
        return (typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
            obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
        );
    }

    calculateScrollbarWidth(): number {
        if (this.calculatedScrollbarWidth !== null) {
            return this.calculatedScrollbarWidth;
        }

        let scrollDiv = document.createElement('div');
        scrollDiv.className = 'px-ui-scrollbar-measure';
        document.body.appendChild(scrollDiv);

        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        this.calculatedScrollbarWidth = scrollbarWidth;

        return scrollbarWidth;
    }

    invokeElementMethod(element: any, methodName: string, args?: any[]): void {
        (element)[methodName].apply(element, args);
    }

    clearSelection(): void {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                window.getSelection().removeAllRanges();
            }
        } else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            } catch (error) {
                //ignore IE bug
            }
        }
    }
}
