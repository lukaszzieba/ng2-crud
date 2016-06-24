// ng2
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// my components
import { Category, CategoryService } from './category.service';

@Component({
    selector: 'category-form',
    templateUrl: './app/category/category-form.component.html',
    providers: [CategoryService]
})
export class CategoryFormComponent implements OnInit {

    category: Category;

    constructor(
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.category = <Category>{}
        this.category.is_visible = true;
    }

    save() {
        this.category.parent_id = 11;
        this.category.ordering = 5;
        this._categoryService.addCategory(this.category);
        this._backToCategories();
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            let id = +params['id'];
            if (id) {
                this._categoryService.getCategoryById(id)
                    .subscribe(category => this.category = category);
            }
        });
    }
    private _backToCategories() {
        let route = ['/categories'];
        this._router.navigate(route);
    }
}