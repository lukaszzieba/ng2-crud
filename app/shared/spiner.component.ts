import { Component, OnInit, Input } from '@angular/core';

@Component({    
    selector: 'spiner',
    template : '<div *ngIf="visible" class="col-md-1 col-md-offset-6"><i class="fa fa-spinner fa-spin" style="font-size:36px;"></i></div>'
})
export class SpinerComponent implements OnInit {

    @Input() visible : boolean;

    constructor() { }

    ngOnInit() { }

}