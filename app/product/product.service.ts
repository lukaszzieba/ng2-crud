import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { CONFIG } from '../shared/config';
let porductsUrl = CONFIG.baseUrls.products;

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
}

@Injectable()
export class ProductService {
    constructor(private _http: Http) { }

    getProducts() {
        return this._http.get(porductsUrl)
            .map((response: Response) => <Product[]>response.json().data);
    }
}