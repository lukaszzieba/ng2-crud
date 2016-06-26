// ng2
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// my components
import { Product, ProductService } from './product.service';

@Component({
    selector: 'product-list',
    templateUrl: './app/product/product-list.component.html',
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {

    products: Product[];

    constructor(
        private _productService: ProductService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute) { }

    goToProductForm() {
        this._activatedRoute.params.subscribe(params => {
            let parentId = + params['id'];
            this._router.navigate(['/product/parent/', parentId]);
        });

    }

    ngOnInit() {
        this._productService.getProducts()
            .subscribe(products => {
                this.products = products;
            })
    }

}