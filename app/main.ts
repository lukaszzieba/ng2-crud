/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />

// ng2
import { bootstrap } from '@angular/platform-browser-dynamic';

// my components
import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS]).catch(err => console.error(err));
