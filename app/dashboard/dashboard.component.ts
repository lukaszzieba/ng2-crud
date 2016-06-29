// ng2
import { Component, OnInit } from '@angular/core';

// my components
import { CategoryListComponent } from '../category/category-list.component';

@Component({    
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.component.html',
    directives: [CategoryListComponent]
})
export class DashboardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}