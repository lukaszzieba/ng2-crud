// ng2
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// rxjs
import { Subject } from 'rxjs/Subject';

// my components
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

    private _products$: Subject<Product[]>;
    private _dataStore: {
        products: Product[]
    };   
    constructor(private _http: Http) {
        this._products$ = new Subject<Product[]>();
        this._dataStore = { products: [] };
       
    }

    get products$() {
        return this._products$.asObservable();
    }   

    filter(search: string) {
        let response = <Product[]>[];
        this._dataStore.products.forEach((el, i) => {
            if (el.name.includes(search)) {
                response.push(el)
            }
        });
        this._products$.next(response);
    }

    getProducts(parentId: number) {
        this._http.get(porductsUrl + '/?category_id=' + parentId)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this._dataStore.products = data;
                this._products$.next(this._dataStore.products);               
            });
    }

    addProduct(product: Product) {
        let body = JSON.stringify(product);
        this._http.post(porductsUrl, body)
            .map((res: Response) => res.json().data)
            .subscribe(data => {
                this._dataStore.products.push(data);
                this._products$.next(this._dataStore.products);                 
            });
    }

    deleteProduct(id: number) {
        this._http.delete(porductsUrl + '/' + id)
            .subscribe((res: Response) => {
                this._dataStore.products.forEach((p, i) => {
                    if (p.id === id) {
                        this._dataStore.products.splice(i, 1);
                    }
                });
            });
        this._products$.next(this._dataStore.products);
    }

    updateProduct(updatedProduct: Product) {
        let body = JSON.stringify(updatedProduct);
        this._http.put(porductsUrl + '/' + updatedProduct.id, body)
            .subscribe((res: Response) => {
                if (res.ok) {
                    this._dataStore.products.forEach((p, i) => {
                        if (p.id === updatedProduct.id) {
                            this._dataStore.products[i] = updatedProduct;
                        }
                    });
                    this._products$.next(this._dataStore.products);
                }
            });
    }
}