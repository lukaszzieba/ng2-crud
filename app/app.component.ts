// ng2
import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';

// ng2 in memory web api
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { CategoryData }   from './api/category-data';

// my components
import { NavComponent } from './shared/nav/nav.component';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        NavComponent        
    ],
    providers: [
        HTTP_PROVIDERS,
        { provide: XHRBackend, useClass: InMemoryBackendService },
        { provide: SEED_DATA, useClass: CategoryData }
    ],
    viewProviders: []
})
export class AppComponent {
    constructor() {
    }
}
