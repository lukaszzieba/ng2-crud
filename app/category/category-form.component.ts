// ng2
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// my components
import { Category, CategoryService } from './category.service';


@Component({
    selector: 'category-form',
    templateUrl: './app/category/category-form.component.html',
    providers: [
        CategoryService,        
    ]  
})
export class CategoryFormComponent implements OnInit {

    isAddMode() {

    }

    categoryId: number;
    parentId: number;
    category: Category;

    constructor(
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.category = <Category>{}
        this.category.is_visible = true;
    }

    save() {       
        this.parentId ? this.category.parent_id = this.parentId : this.category.parent_id = this._categoryService.getRootCategoryId();        
        this.category.ordering = 5;
        this._categoryService.addCategory(this.category);
        this._backToCategories();
    }


    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            // for edit 
            this.categoryId = +params['id'];

            // add nested category
            this.parentId = +params['parentId'];

            if (this.categoryId) {
                this._categoryService.getCategoryById(this.categoryId)
                    .subscribe(category => this.category = category);
            }           
        });
    }
    private _backToCategories() {
        let route = ['/categories'];
        this._router.navigate
    }
}