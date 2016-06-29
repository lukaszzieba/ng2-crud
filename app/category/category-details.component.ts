// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryListComponent } from './category-list.component';
import { ProductListComponent } from '../product/product-list.component';

@Component({
    selector: 'category-details',
    templateUrl: 'app/category/category-details.component.html',
    styleUrls: ['app/category/category-details.component.css'],
    directives: [        
        CategoryListComponent,
        ProductListComponent
    ],
    providers: [
        CategoryService        
    ]
})
export class CategoryDetailsComponent implements OnInit {

    formShowing: boolean = false;
    category: Category;    

    constructor(
        private _categoryService: CategoryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.category = <Category>{};        
     }

    getCategoryById(id: number) {
        this.category = <Category>{};
        this._categoryService.getCategoryById(id)
            .subscribe((category) => {
                this.category = category                
            });
    }   

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            let id = +params['id'];
            if (id) {
                this.getCategoryById(id);                          
            }
        });
    }
}