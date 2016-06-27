// ng2
import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// my components
import { Category, CategoryService } from './category.service';
import { CategoryFormComponent } from './category-form.component';
// import { SpinerComponent } from '../shared/spiner.component';
// import { CategoryStore } from './category.store';

@Component({
    selector: 'category-list',
    templateUrl: 'app/category/category-list.component.html',
    styleUrls: ['app/category/category-list.component.css'],
    directives: [CategoryFormComponent],
    providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {

    categories: Observable<Category[]>;
    categoryToUpdate: Category;
    showForm: boolean;

    @Input() noEdit: boolean = false;
    loading: boolean = true;

    constructor(private _categoryService: CategoryService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.categories = this._categoryService.categories$;
        this.showForm = false;
    }

    addCategory(category: Category) {
        console.log(category);        
        this._categoryService.addCategory(category);
        this.showForm = false;
    }

    cancel(e: any) {
        this.showForm = false;
        this.categoryToUpdate = null;
    }

    edit(category: Category) {
        this.categoryToUpdate = category;
        this.showForm = true;
    }

    save(updateCategory : Category) {
        console.log(updateCategory);
        this._categoryService.updateCategory(updateCategory);
        this.showForm = false;
        this.categoryToUpdate = null;        
    }

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            let id = !params['id'] ? this._categoryService.getRootCategoryId() : params['id'];
            this._categoryService.getCategoryByParentId(id);
        });
    }


    goToCategoryDetails(categoryId: number) {
        this._router.navigate(['/details', categoryId])
    }


    // goToCategoryForm(id: number) {
    //     this._activatedRoute.params.subscribe(params => {
    //         let paramId = + params['id'];
    //         console.log('Para id' + paramId);
    //         if (id) {
    //             this._router.navigate(['/category', id])
    //         } else if (paramId) {
    //             this._router.navigate(['/category/parent/', paramId])
    //         }
    //         else {
    //             this._router.navigate(['/category', 'new'])
    //         }
    //     });
    // }
}
