// ng2
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS}  from 'ng2-material';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
    selector: 'text-filter',
    template: `
    <form>
        <md-input placeholder="Filter" style="width: 180px" [(ngModel)]="filter" (keyup)="filterChanged($event)"></md-input>
    </form>
    `,
    directives: [MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES],
    providers: [MATERIAL_PROVIDERS]
})
export class TextFilterComponent implements OnInit {

    @Output() changed: EventEmitter<string>;
    filter: string;

    constructor() {
        this.changed = new EventEmitter<string>();
    }

    clear() {
        this.filter = '';
    }

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.filter);
    }

    ngOnInit() { }
}