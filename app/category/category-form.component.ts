// ng2
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
// lodash
import { lodash } from 'lodash';

// my components
import { Category, CategoryService } from './category.service';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';

@Component({
    selector: 'category-form',
    templateUrl: './app/category/category-form.component.html',
    styleUrls: ['./app/category/category-form.component.css'],
    directives: [MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES, MdCheckbox],
    providers: [        
        MATERIAL_PROVIDERS
    ]
})
export class CategoryFormComponent implements OnInit, OnDestroy {

    // for add
    @Output() addCategory = new EventEmitter();
    category: Category;

    // for edit
    @Input() categoryToEdit: Category;
    @Output() updateCategory = new EventEmitter();
    editMode: boolean = false;

    // cancel
    @Output() cancelForm = new EventEmitter();

    categoryId: number;
    parentId: number;


    constructor(        
        private _categoryService: CategoryService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router) {
        this.category = <Category>{}
        this.category.is_visible = true;
    }

    cbChange(e: any) {       
        this.category.is_visible = e.checked;
    }

    add() {
        this.category.parent_id = this.categoryId;
        this.addCategory.emit(this.category);        
    }

    save() {
        this.updateCategory.emit(this.category);
    }

    cancel() {
        this.cancelForm.emit({});
    }

    ngOnInit() {
        this._setState();
    }

    ngOnDestroy() {
        this.category = <Category>{};
        this.categoryToEdit = null;
    }

    private _setState() {
        if (this.categoryToEdit) {
            this.category = this.categoryToEdit;
            this.editMode = true;
        }
        this._activatedRoute.params.subscribe(params => {
            this.categoryId = params['id'] ? params['id'] : this._categoryService.getRootCategoryId();
        });
    }
}