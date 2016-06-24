// ng2
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryStore } from './category.store';


@Component({
    selector: 'category-form',
    templateUrl: './app/category/category-form.component.html',
    providers: [
        CategoryService,
        CategoryStore
    ]
})
export class CategoryFormComponent implements OnInit {

    categoryId: number;
    parentId: number;
    category: Category;

    editMode: boolean = false;

    constructor(
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _categoryStore : CategoryStore) {
        this.category = <Category>{}
        this.category.is_visible = true;
    }

    add() {
        this.parentId ? this.category.parent_id = this.parentId : this.category.parent_id = this._categoryService.getRootCategoryId();
        this.category.ordering = 5;
        // this._categoryService.addCategory(this.category);
        this._categoryStore.addCategory(this.category);
        this._goBack();
    }

    cancel() {
        // this._goBack();
         
        $("#confirmDialog").modal("show");
    }

    delete() {
        this._categoryStore.deleteCategory(this.category.id);
        this._goBack();
    }

    save() {
        this._categoryStore.update(this.category);
        this._goBack();
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            // for edit 
            this.categoryId = +params['id'];

            // add nested category
            this.parentId = +params['parentId'];

            if (this.categoryId) {
                this.editMode = true;
                this._categoryService.getCategoryById(this.categoryId)
                    .subscribe(category => this.category = category);
            }
        });
    }
    private _goBack() {
        window.history.back();
        // let route = ['/categories'];
        // this._router.navigate(route)
    }
}