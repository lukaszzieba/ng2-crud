// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryStore } from './category.store';
// import { SpinerComponent } from '../shared/spiner.component';

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
    // subCategories: Observable<Category[]>;

    constructor(
        private _categoryService: CategoryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.category = <Category>{};
        // this.subCategories = this._categoryService.categories$;
     }

    getCategoryById(id: number) {
        this.category = <Category>{};
        this._categoryService.getCategoryById(id)
            .subscribe((category) => {
                this.category = category                
            });
    }

    goToEdit() {
         if (this.category.id) {
                this._router.navigate(['/category', this.category.id]);
         }
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