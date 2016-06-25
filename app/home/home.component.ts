// ng2
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material";

import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    styleUrls: ['app/home/home.component.css'],
    providers: [MATERIAL_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES]
})
export class HomeComponent implements OnInit {  
    ngOnInit() { }

    close() {
        console.log('asd');        
    }

    confirmClose(evt) {
        console.log(evt);
        
    }
}