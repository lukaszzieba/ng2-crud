// ng2
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlGroup, Control, FormBuilder, Validators} from '@angular/common';

// my components
import { Product } from './product.service';
import { PriceValidators  } from '../shared/validators/price.validator';

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

    productForm: ControlGroup;

    cantBeNaN(control: Control) {
        if (parseFloat(control.value)) {
            return null
        } else {
            return { isNan: true }
        }
    } 

    constructor(
        private _activatedRoute: ActivatedRoute,
        public _formBuilder: FormBuilder) {
        this.product = <Product>{};
        this.productToEdit = <Product>{};
        this.editMode = false;

        this.productForm = this._formBuilder.group({
            productName: ['', Validators.required],
            productDexcription: [''],
            productPrice: ['', Validators.compose([
                Validators.required,
                this.cantBeNaN])]
        })
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
        this.product = <Product>{};
        this.productToEdit = null;
    }
}