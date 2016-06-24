// ng2
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(public modal: Modal, viewContainer: ViewContainerRef) {
        modal.defaultViewContainer = viewContainer;
    }

    openAlert() {
        return this.modal.confirm()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title('Hello World')
            .body('A Customized Modal')     
            .okBtn('asd')       
            .open()
            

    }

    ngOnInit() { }
}