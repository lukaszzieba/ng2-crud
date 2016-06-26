// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';

// my components
import { Product, ProductService } from './product.service';
import { ProductFormComponent } from './product-form.component';

@Component({
    selector: 'product-list',
    templateUrl: './app/product/product-list.component.html',
    styleUrls: ['./app/product/product-list.component.css'],
    directives: [
        ProductFormComponent,
        MATERIAL_DIRECTIVES
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

    constructor(
        private _productService: ProductService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) {
        this.products = this._productService.products$;
        this.showForm = false;
    }

    // add product
    add(product: Product) {
        console.log(product);
        this._productService.addProduct(product);
        this.showForm = false;
    }

    // delete product  
    setToDelete(id: number) {
        this.productIdToDelete = id;
        console.log(this.productIdToDelete);
    }

    confirmClose($event: boolean) {
        if ($event) {
            this._productService.deleteProduct(this.productIdToDelete);
        }
    }

    // edit product
    editProduct(product: Product) {
        console.log(product);
        this.productToEdit = product;
        this.showForm = true;
    }

    save(updatedProduct: Product) {
        console.log(updatedProduct);
        this._productService.updateProduct(updatedProduct);
        this.showForm = false;
        this.productToEdit = null;
    }

    cancel() {
        console.log('asdzxc');
        
        this.showForm = false;
        this.productToEdit = null;
    }

    // init
    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this.parentId = + params['id'];
            this._productService.getProducts(this.parentId);
        });
    }

}