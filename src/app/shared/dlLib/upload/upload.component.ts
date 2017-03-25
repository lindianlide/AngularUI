import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dl-upload',
  styleUrls: ['./upload.css'],
  templateUrl: './upload.component.html'
})

export class UploadComponent {

  fileName:string = '';
    @Input() buttonType:string = 'font';
    @Output() fileReader = new EventEmitter<any>();

    constructor(private _elementRef:ElementRef) {

    }

    fileChange($event:any, index:any) {
        let file = $event.target;
        this.fileName = file.files[0].name;
        this.fileReader.emit(file);
    }
}