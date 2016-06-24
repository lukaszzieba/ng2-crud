// ng2
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';

// ng2 in memory web api
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { CategoryData }   from './api/category-data';

// my components
import { NavComponent } from './shared/nav/nav.component';
import { FootComponent } from './shared/foot/foot.component';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [
        // ng2
        ROUTER_DIRECTIVES,   
             
         // my components
         NavComponent,
         FootComponent       
    ],
    providers: [
        // ng2
        HTTP_PROVIDERS,

        // ng2 in memory web api
        { provide: XHRBackend, useClass: InMemoryBackendService },
        { provide: SEED_DATA, useClass: CategoryData }        
    ]
})
export class AppComponent {
   
}
