// ng2
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// my components
import { Product } from './product.service';

// ng2 material
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

@Component({
    selector: 'product-form',
    templateUrl: './app/product/product-form.component.html',
    styleUrls: ['./app/product/product-form.component.css'],
    directives: [MATERIAL_DIRECTIVES, MD_INPUT_DIRECTIVES],
    providers: [

    ]
})
export class ProductFormComponent implements OnInit, OnDestroy {

    // for add
    @Output() addProduct = new EventEmitter();
    product: Product;

    // for edit
    @Input() productToEdit: Product;
    @Output() updateProduct = new EventEmitter();
    editMode: boolean;

    // cancel
    @Output() cancelForm = new EventEmitter();

    constructor(
        private _activatedRoute: ActivatedRoute) {
        this.product = <Product>{};
        this.productToEdit = <Product>{};
        this.editMode = false;
    }

    add() {
        this.addProduct.emit(this.product);        
    }

    update() {
        this.updateProduct.emit(this.product);      
    }

    cancel() {
        this.cancelForm.emit({});        
    }

    ngOnInit() {
        if (!this.productToEdit) {
            this._activatedRoute.params.subscribe(params => {
                let parentId = + params['id'];
                this.product.category_id = parentId;
            });
        } else {
            this.product = this.productToEdit;
            this.editMode = true;
        }
    }

    ngOnDestroy() {
        console.log('destrot');
        this.product = <Product>{};
        this.productToEdit = null;
    }
}