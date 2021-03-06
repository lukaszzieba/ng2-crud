// ng2
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Subject } from 'rxjs/Subject';

// my componets
import { CONFIG } from '../shared/config';
let rootCategoryId = CONFIG.baseUrls.rootCategoryId;
let categoriesUrl = CONFIG.baseUrls.categories;
let porductsUrl = CONFIG.baseUrls.products;

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
    private _dataStore: {
        categories: Category[]
    };

    constructor(private _http: Http) {
        this._categories$ = new Subject<Category[]>();
        this._dataStore = { categories: [] };
    }

    get categories$() {
        return this._categories$.asObservable();
    }

    filter(search: string) {
        let response = <Category[]>[];
        this._dataStore.categories.forEach((el, i) => {
            if (el.name.includes(search)) {
                response.push(el)
            }
        });
        this._categories$.next(response);
    }

    getRootCategoryId() {
        return rootCategoryId;
    }

    addCategory(category: Category) {
        let body = JSON.stringify(category);
        this._http.post(`${categoriesUrl}`, body)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this._dataStore.categories.push(data);
                this._categories$.next(this._dataStore.categories);
            });
    }

    getCategoryById(id: number) {
        let url = categoriesUrl + '/' + id;
        return this._http.get(url)
            .map((res: Response) => res.json().data);

    }

    getCategoryByParentId(parent_id: number) {
        let url = categoriesUrl + '/?parent_id=' + parent_id;
        this._http.get(url)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this._dataStore.categories = data;
                this._categories$.next(this._dataStore.categories);
            })
    }

    deleteCategory(id: number) {
        this._http.delete(categoriesUrl + '/' + id)
            .subscribe((res: Response) => {
                this._dataStore.categories.forEach((c, i) => {
                    if (c.id === id) {
                        this._dataStore.categories.splice(i, 1);
                    }
                });
            });
        this._categories$.next(this._dataStore.categories);
        this.deleteNestedCategories(id);
    }

    deleteNestedCategories(parent_id: number) {
        let url = categoriesUrl + '/?parent_id=' + parent_id;
        this._http.get(url)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this.deleteNestedProducts(parent_id);
                if (data.length > 0) {
                    data.forEach((c, i) => {
                        this.deleteCategory(c.id);
                        this.deleteNestedProducts(c.id);
                    });
                } 
            });
    }

    deleteNestedProducts(parentId: number) {       
        let url = porductsUrl + '/?category_id=' + parentId;
        this._http.get(url)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                if (data.length > 0) {
                    data.forEach((p, i) => {
                        this._http.delete(porductsUrl + '/' + p.id);
                    })
                }
            });
    }

    updateCategory(updateCategory: Category) {
        let body = JSON.stringify(updateCategory);
        this._http.put(categoriesUrl + '/' + updateCategory.id, body)
            .subscribe((res: Response) => {
                if (res.ok) {
                    this._dataStore.categories.forEach((c, i) => {
                        if (c.id === updateCategory.id) {
                            this._dataStore.categories[i] = updateCategory;
                        }
                    });
                    this._categories$.next(this._dataStore.categories);
                }
            });
    }
}
