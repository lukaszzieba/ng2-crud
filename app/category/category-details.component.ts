// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// my components
import { Category, CategoryService } from './category.service';
import { SpinerComponent } from '../shared/spiner.component';

@Component({
    selector: 'category-details',
    templateUrl: 'app/category/category-details.component.html',
    styleUrls: ['app/category/category-details.component.css'],
    directives: [    
        SpinerComponent   
    ],
    providers: [
        CategoryService
    ]
})
export class CategoryDetailsComponent implements OnInit {

    formShowing: boolean = false;
    category : Category;
    subCategories: Category[] = [];

    constructor(
        private _categoryService: CategoryService,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    getCategoryById(id: number) {
        this.category = <Category>{};
        this._categoryService.getCategoryById(id)
        .subscribe((category) => { 
            this.category = category
            console.log(this.category);
        });   
    }

    getSubCategories(parent_id: number) {
        this._categoryService.getCategoryByParentId(parent_id)
            .subscribe((subCategories: Category[]) => {
                this.subCategories = subCategories;
                // log  sub categories
                console.log(this.subCategories);
            });
    }

    ngOnInit() {      
        this._activatedRoute.params.subscribe(params => {
            let id = +params['id'];
            if (id) {
                this.getCategoryById(id);
                this.getSubCategories(id)
            }
        });
    }
}