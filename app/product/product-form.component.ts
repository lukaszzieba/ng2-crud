// ng2
import { Component, OnInit } from '@angular/core';

// my components
import { Product, ProductService } from './product.service';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

@Component({    
    selector: 'product-form',
    templateUrl: './app/product/product-form.component.html',
    styleUrls: ['./app/product/product-form.component.css'],
    directives: [MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES],
    providers: [
        ProductService
    ]
})
export class ProductFormComponent implements OnInit {
    product : Product;

    constructor(
        private _productService : ProductService) {
            this.product = <Product>{};
         }

    ngOnInit() { }
}