import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAppState } from '@app/core/store/state';
import {
  GetProducts,
  CreateProduct,
  UpdateProduct,
  DeleteProduct
} from '@app/core/store/actions';

import { IProduct } from '@app/core/models';

@Component({
  selector: 'app-input-product',
  templateUrl: './input-product.component.html',
  styleUrls: ['./input-product.component.scss']
})
export class InputProductComponent implements OnInit, OnDestroy {
  @Input() product$: Observable<IProduct>;

  private ngUnsubscribe$ = new Subject();
  private currentProductId: number;

  public inputForm: FormGroup = new FormGroup({
    name: new FormControl(
      {
        value: '',
        disabled: false
      },
      [Validators.required, Validators.minLength(3)]
    ),
    description: new FormControl(
      {
        value: '',
        disabled: false
      },
      [Validators.required, Validators.minLength(3)]
    ),
    price: new FormControl(
      {
        value: '',
        disabled: false
      },
      [Validators.required, Validators.pattern('^[0-9]+([,.]?[0-9]{1,2})?$')]
    ),
    qty: new FormControl(
      {
        value: '',
        disabled: false
      },
      [Validators.required, Validators.pattern('^[0-9]*$')]
    )
  });

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.product$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(product => {
      if (!product) {
        return;
      }

      this.currentProductId = product.id;

      this.inputForm.controls.name.setValue(product.name);
      this.inputForm.controls.description.setValue(product.description);
      this.inputForm.controls.price.setValue(product.price);
      this.inputForm.controls.qty.setValue(product.qty);
    });
  }

  submit() {
    if (!this.inputForm.valid) {
      for (const i in this.inputForm.controls) {
        if (!this.inputForm.controls[i].valid) {
          this.inputForm.controls[i].markAsTouched();
        }
      }
      return;
    }
    this.store.dispatch(new CreateProduct(this.inputForm.value));
  }

  getProductHandler() {
    this.store.dispatch(new GetProducts());
  }

  updateProductHandler() {
    if (!this.inputForm.valid) {
      for (const i in this.inputForm.controls) {
        if (!this.inputForm.controls[i].valid) {
          this.inputForm.controls[i].markAsTouched();
        }
      }
      return;
    }

    this.store.dispatch(
      new UpdateProduct({
        ...this.inputForm.value,
        id: this.currentProductId
      })
    );
  }

  deleteProductHandler() {
    this.store.dispatch(
      new DeleteProduct({
        id: this.currentProductId,
        name: '',
        description: '',
        price: 0,
        qty: 0
      })
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
