// ng2
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// my components
import { Category, CategoryService } from './category.service';
// import { CategoryStore } from './category.store';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
    selector: 'category-form',
    templateUrl: './app/category/category-form.component.html',
    styleUrls: ['./app/category/category-form.component.css'],
    directives: [MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
    providers: [
        CategoryService,
        ToastsManager,
        MATERIAL_PROVIDERS
    ]
})
export class CategoryFormComponent implements OnInit {

    category: Category;
    @Output() addCategory = new EventEmitter()

    categoryId: number;
    parentId: number;
    editMode: boolean = false;

    constructor(
        public _toastsManager: ToastsManager,
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.category = <Category>{}
        this.category.is_visible = true;
    }

    cbChange(e) {
        // console.log(e);
        // this.category.is_visible = e.checked;
    }

    add() {
        this.addCategory.emit(this.category);
        this._toastsManager.success('Add category complete!', 'Success!');
    }

    cancel() {
        // this._goBack();
    }

    delete() {
        // this._categoryStore.deleteCategory(this.category.id);
        // this._goBack();
    }

    confirmClose($event) {
        // if ($event) {
        //     this.delete();
        // }
        // console.log($event);
    }

    save() {
        // this._categoryStore.update(this.category);
        // this._goBack();
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