// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// lodash
import  * as _ from 'lodash';

// rxjs
import { Observable } from 'rxjs/Observable';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';

// my components
import { Product, ProductService } from './product.service';
import { ProductFormComponent } from './product-form.component';
import { TextFilterComponent } from '../shared/text-filter/text-fliter.component'

@Component({
    selector: 'product-list',
    templateUrl: './app/product/product-list.component.html',
    styleUrls: ['./app/product/product-list.component.css'],
    directives: [
        ProductFormComponent,
        MATERIAL_DIRECTIVES,
        TextFilterComponent
    ],
    providers: [
        ProductService,
        MATERIAL_PROVIDERS
    ]

})
export class ProductListComponent implements OnInit {

    products: Observable<Product[]>;
    parentId: number;
    showForm: boolean;

    productToEdit: Product;
    productIdToDelete: number;
    productsLength: number;

    editMode: boolean = false;    

    constructor(
        private _productService: ProductService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.products = this._productService.products$;
        this.showForm = false;      
    }

    filterChanged(search: string) {
        this._productService.filter(search);
    }

    // add product
    add(product: Product) {
        this._productService.addProduct(product);
        this.showForm = false;
    }

    // delete product  
    setToDelete(id: number) {
        this.productIdToDelete = id;
    }

    confirmClose($event: boolean) {
        if ($event) {
            this._productService.deleteProduct(this.productIdToDelete);
        }
    }

    // edit product
    editProduct(product: Product) {   
        let productClone = _.clone(product);
        this.productToEdit = productClone;
        this.showForm = true;
    }

    save(updatedProduct: Product) {
        this._productService.updateProduct(updatedProduct);
        this.showForm = false;
        this.productToEdit = null;
    }

    cancel() {
        this.showForm = false;
        this.productToEdit = null;
    }

    // init
    ngOnInit() {
        this._checkSecureUrl();
        this._getProducts();
    }

    private _checkSecureUrl() {
        this._activatedRoute.url.subscribe(url => {
            url.forEach((url, i) => {
                if (url.path === 'dashboard') {
                    this.editMode = true;
                    return;
                }
            });
        });
    }

    private _getProducts() {
        this._activatedRoute.params.subscribe(params => {
            this.parentId = + params['id'];
            this._productService.getProducts(this.parentId);            
        });
    }
}