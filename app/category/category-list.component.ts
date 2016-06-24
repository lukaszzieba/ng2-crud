// ng2
import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';

// my components
import {Category, CategoryService } from './category.service';
import { SpinerComponent } from '../shared/spiner.component';
// import {CategoryComponent } from './category.component';

@Component({
    selector: 'category-list',
    templateUrl: 'app/category/category-list.component.html',
    styleUrls: ['app/category/category-list.component.css'],
    directives : [SpinerComponent],
    providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {
    loading : boolean = true;
    @Input() noEdit: boolean = false;

    formShowing: boolean = false;
    categories: Category[];
    // category: Category = <Category>{};

    constructor(private _categoryService: CategoryService,
        private _router: Router) { }

    getCategories() {
        this.categories = [];

        this._categoryService.getRootCategory()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
                this.loading = false;
                // log categories
                console.log(this.categories);
            });
    }

    goToCategoryForm(id: number) { 
        if (id) {
            this._router.navigate(['/category', id])
        } else {
            this._router.navigate(['/category', 'new'])
        }
    }

    goToCategoryDetails(categoryId: number) {
        console.log(categoryId);
        this._router.navigate(['/details', categoryId])
    }

    ngOnInit() {
        this.getCategories();
    }
}
