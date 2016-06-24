// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryStore } from './category.store';
// import { SpinerComponent } from '../shared/spiner.component';
import { CategoryListComponent } from './category-list.component';

@Component({
    selector: 'category-details',
    templateUrl: 'app/category/category-details.component.html',
    styleUrls: ['app/category/category-details.component.css'],
    directives: [        
        CategoryListComponent
    ],
    providers: [
        CategoryService,
        CategoryStore
    ]
})
export class CategoryDetailsComponent implements OnInit {

    formShowing: boolean = false;
    category: Category;
    subCategories: Category[] = [];

    constructor(
        private _categoryService: CategoryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _categoryStore: CategoryStore
    ) { }

    getCategoryById(id: number) {
        this.category = <Category>{};
        this._categoryService.getCategoryById(id)
            .subscribe((category) => {
                this.category = category
                console.log(this.category);
            });
    }

    goToEdit() {
         if (this.category.id) {
                this._router.navigate(['/category', this.category.id]);
         }
    }

    getSubCategories(parent_id: number) {
        // this._categoryService.getCategoryByParentId(parent_id)
        //     .subscribe((subCategories: Category[]) => {
        //         this.subCategories = subCategories;
        //         // log  sub categories
        //         console.log(this.subCategories);
        //     });
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            let id = +params['id'];
            if (id) {
                this.getCategoryById(id);
                // this.getSubCategories(id)
            }
        });
    }
}