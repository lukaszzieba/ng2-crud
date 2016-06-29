// ng2
import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryFormComponent } from './category-form.component';
import { TextFilterComponent } from '../shared/text-filter/text-fliter.component'

@Component({
    selector: 'category-list',
    templateUrl: 'app/category/category-list.component.html',
    styleUrls: ['app/category/category-list.component.css'],
    directives: [
        CategoryFormComponent,
        MATERIAL_DIRECTIVES,
        TextFilterComponent
    ],
    providers: [
        CategoryService,
        MATERIAL_PROVIDERS
    ]
})
export class CategoryListComponent implements OnInit {

    categories: Observable<Category[]>;
    categoryToUpdate: Category;
    showForm: boolean;

    categoryIdToDelete: number;

    editMode: boolean = false;

    constructor(private _categoryService: CategoryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.categories = this._categoryService.categories$;
        this.showForm = false;
    }

    filterChanged(search: string) {
        this._categoryService.filter(search);
    }

    // add category
    addCategory(category: Category) {        
        this._categoryService.addCategory(category);
        this.showForm = false;
    }

    // to delete category
    setToDelete(id: number) {
        this.categoryIdToDelete = id;       
    }

    confirmClose($event: boolean) {
        if ($event) {
            this._categoryService.deleteCategory(this.categoryIdToDelete);
        }
    }

    // to edit
    edit(category: Category) {
        // this.categoryToUpdate = category;

        let temp: Category = <Category>{};

        temp.id = category.id;
        temp.parent_id = category.parent_id;
        temp.is_visible = category.is_visible;
        temp.ordering = category.ordering;
        temp.name = category.name;
        temp.description = category.description;

        this.categoryToUpdate = temp;

        this.showForm = true;
    }

    save(updateCategory: Category) {
        this._categoryService.updateCategory(updateCategory);
        this.showForm = false;
        this.categoryToUpdate = null;
    }

    cancel(e: any) {
        this.showForm = false;
        this.categoryToUpdate = null;
    }

    // init
    ngOnInit() {
        this._checkSecureUrl();
        this._getCategories();
    }

    goToCategoryDetails(categoryId: number) {
        if (this.editMode) {
            this._router.navigate(['/dashboard/categoty/details/', categoryId])
        } else {
            this._router.navigate(['/categoty/details/', categoryId])
        }
    }

    private _checkSecureUrl() {
        this._activatedRoute.url.subscribe(url => {
            url.forEach((url, i) => {
                if (url.path === 'dashboard') {
                    this.editMode = true;
                }
            });
        });
    }

    private _getCategories() {
        this._activatedRoute.params.subscribe(params => {
            let id = !params['id'] ? this._categoryService.getRootCategoryId() : params['id'];
            this._categoryService.getCategoryByParentId(id);
        });
    }
}
