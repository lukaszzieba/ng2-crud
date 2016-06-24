import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'navigation',
    templateUrl: 'app/shared/nav/navigation.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavComponent implements OnInit {
    
    views: Object[] = [
        {
            name: 'Home',
            description: 'Home page',
            icon: 'home',
            path: "['/home']"
        }, {
            name: 'Dashdoard',
            description: 'Here you can do stuff',
            icon: 'dashboard',
            path: "['/dashboard']"
        },
        {
            name: 'Categories',
            description: 'Look up for categories',
            icon: 'shop_two',
            path: "['/categories']"
        }
    ]

    constructor(private _router : Router) {
        
        
     }    

    ngOnInit() { }
}