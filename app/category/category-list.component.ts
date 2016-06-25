// ng2
import { Component, OnInit, Input  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// my components
import { Category, CategoryService } from './category.service';
// import { SpinerComponent } from '../shared/spiner.component';
import { CategoryStore } from './category.store';

@Component({
    selector: 'category-list',
    templateUrl: 'app/category/category-list.component.html',
    styleUrls: ['app/category/category-list.component.css'],
    directives: [],
    providers: [CategoryService, CategoryStore]
})
export class CategoryListComponent implements OnInit {

    @Input() noEdit: boolean = false;

    loading: boolean = true;

    constructor(private _categoryService: CategoryService,
        private _router: Router,
        private _categoryStore: CategoryStore,
        private _activatedRoute: ActivatedRoute) { 
    }

    goToCategoryForm(id: number) {
        this._activatedRoute.params.subscribe(params => {
            let paramId = + params['id'];
            console.log('Para id' + paramId);
            if (id) {
                this._router.navigate(['/category', id])
            } else if (paramId) {
                this._router.navigate(['/category/parent/', paramId])
            }
            else {
                this._router.navigate(['/category', 'new'])
            }
        });
    }

    goToCategoryDetails(categoryId: number) {
        this._router.navigate(['/details', categoryId])
    }

    ngOnInit() {
        this.loading = false;
    }
}
