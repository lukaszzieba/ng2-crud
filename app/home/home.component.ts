// ng2
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material";

import {OVERLAY_PROVIDERS} from '@angular2-material/core/overlay/overlay';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    providers: [MATERIAL_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    homeObj: Object = {
        title: "Angular 2 CRUD app",
        text: `Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target.
                    For web, mobile web, native mobile and native desktop.`
    }
    ngOnInit() { }
}