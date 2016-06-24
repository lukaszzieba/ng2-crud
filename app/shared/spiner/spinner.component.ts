import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ISpinnerState, SpinnerService } from './spinner.service';

const ACTIVE_CLASS = 'is-active';

@Component({
  selector: 'story-spinner',
  template: `
  <div *ngIf="visible" class="col-md-1 col-md-offset-5"><i class="fa fa-spinner fa-spin" style="font-size:36px;"></i></div>
  `,
  styles: [`.spinner {position: absolute;left: 46%;top: 12%`]
})

export class SpinnerComponent implements OnDestroy, OnInit {
  visible = false;

  private _spinnerStateChanged: Subscription<any>

  constructor(private _spinnerService: SpinnerService) { }

  ngOnInit() {
    // componentHandler.upgradeDom();
    this._spinnerStateChanged = this._spinnerService.spinnerState
      .subscribe((state: ISpinnerState) => this.visible = state.show);
  }

  ngOnDestroy() {
    this._spinnerStateChanged.unsubscribe();
  }
}



    // <div
    //   class="spinner mdl-spinner mdl-js-spinner mdl-spinner--single-color"
    //   [class.is-active]="visible"></div>
