// ng2
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

// ng2 material
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES}  from "@angular2-material/list";
import {MdToolbar} from '@angular2-material/toolbar';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

@Component({
    selector: 'navigation',
    templateUrl: 'app/shared/nav/navigation.component.html',
    directives: [
        ROUTER_DIRECTIVES,       
        MD_SIDENAV_DIRECTIVES,
        MD_BUTTON_DIRECTIVES,
        MD_LIST_DIRECTIVES,        
        MdToolbar,
        MdIcon
        ],
    providers: [MdIconRegistry]
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
    ngOnInit() { }
}