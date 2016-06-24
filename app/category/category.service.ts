// ng2
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Observable } from 'rxjs/Observable';

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
    constructor(private _http: Http) { }

    getRootCategoryId() {
        return rootCategoryId;
    }

    getRootCategory() {
        return this._http.get(rootCategory)
            // .map((response: Response) => response.json().data)
            // .catch(this.errorHandler);
    }

    addCategory(category: Category) {
        let body = JSON.stringify(category);
        // this._spinnerService.show();
        return this._http
            .post(`${categoriesUrl}`, body)
            .map(res => {
                res.json().data
            })
        //.catch(this.errorHandler);
    }

    getCategoryById(id: number) {
        let url = categoriesUrl + '/' + id;
        return this._http.get(url)
            .map((response: Response) =>  response.json().data);
        // .catch(this.errorHandler);
    }

    getCategoryByParentId(parent_id: number) {
        let url = categoriesUrl + '/?parent_id=' + parent_id;
        // console.log(url);
        return this._http.get(url)
            // .map((response: Response) => <Category[]>response.json().data)
        // .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Servrr error');
    }
}
