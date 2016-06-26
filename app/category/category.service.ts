// ng2
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';


// my componets
import { CONFIG } from '../shared/config';
let rootCategoryId = CONFIG.baseUrls.rootCategoryId;
let rootCategory = CONFIG.baseUrls.rootCategory;
let categoriesUrl = CONFIG.baseUrls.categories;

export interface Category {
    id: number;
    parent_id: number;
    is_visible: boolean;
    name: string;
    description: string;
    ordering: number;
}

@Injectable()
export class CategoryService {

    private _categories$: Subject<Category[]>;
    private _dataStore: {  // This is where we will store our data in memory
        categories: Category[]
    };

    constructor(private _http: Http) {
        this._categories$ = new Subject<Category[]>();
        this._dataStore = { categories: [] };
    }

    get categories$() {
        return this._categories$.asObservable();
    }

    getRootCategoryId() {
        return rootCategoryId;
    }

    getRootCategory() {
        this._http.get(rootCategory)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this._dataStore.categories = data;
                this._categories$.next(this._dataStore.categories);
            });           
    }

    addCategory(category: Category) {
        let body = JSON.stringify(category);       
        return this._http .post(`${categoriesUrl}`, body)
        .map((res : Response) => res.json().data)
        .subscribe(data => {
            this._dataStore.categories.push(data);
            this._categories$.next(this._dataStore.categories);
        });
    }

    getCategoryById(id: number) {
        let url = categoriesUrl + '/' + id;
        return this._http.get(url)
            .map((response: Response) => response.json().data);
        // .catch(this.errorHandler);
    }

    getCategoryByParentId(parent_id: number) {
        let url = categoriesUrl + '/?parent_id=' + parent_id;
        // console.log(url);
        return this._http.get(url)
        // .map((response: Response) => <Category[]>response.json().data)
        // .catch(this.errorHandler);
    }

    deleteCategory(id: number) {
        let url = categoriesUrl + '/' + id;
        return this._http.delete(url);
    }

    updateCategory(category: Category) {
        let url = categoriesUrl + '/' + category.id
        let body = JSON.stringify(category);
        return this._http.put(url, body);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Servrr error');
    }
}
