import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { IAppState } from '@app/core/store/state';
import { GetProducts, SetCurrectProduct } from '@app/core/store/actions';
import {
  selectProductsList,
  selectRequestState,
  selectCurrentProduct,
  selectRequestDescription
} from '@app/core/store/selectors';
import { IProduct } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular CRUD';
  currentProduct$ = this.store.pipe(select(selectCurrentProduct));
  products$ = this.store.pipe(select(selectProductsList));
  request$ = this.store.pipe(select(selectRequestState));
  description$ = this.store.pipe(select(selectRequestDescription));

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    // check initial loading after 1500ms
    setTimeout(() => {
      this.store.dispatch(new GetProducts());
    }, 1500);
  }

  onRowClick(index: IProduct): void {
    this.store.dispatch(new SetCurrectProduct(index));
  }
}
