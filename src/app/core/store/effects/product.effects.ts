import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IAppState } from '@app/core/store/state';
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  SetProducts,
  GetProducts,
  EProductActions,
  SetLoading,
  SetSuccess
} from '@app/core/store/actions';
import { ApiService } from '@app/core/services';
import { IProductsHttp } from '@app/core/models';

@Injectable()
export class ProductEffects {
  constructor(
    private userService: ApiService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}

  @Effect()
  getProduct$ = this.actions$.pipe(
    ofType<GetProducts>(EProductActions.GetProducts),
    switchMap(() => {
      this.store.dispatch(new SetLoading());
      return this.userService.getProducts();
    }),
    switchMap((userHttp: IProductsHttp) => {
      this.store.dispatch(new SetSuccess());
      return of(new SetProducts(userHttp.products));
    })
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType<CreateProduct>(EProductActions.CreateProduct),
    switchMap(action => this.userService.postProducts(action.payload)),
    switchMap(_ => of(new GetProducts()))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType<UpdateProduct>(EProductActions.UpdateProduct),
    switchMap(action => this.userService.updateProducts(action.payload)),
    switchMap(_ => of(new GetProducts()))
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType<DeleteProduct>(EProductActions.DeleteProduct),
    switchMap(action => this.userService.deleteProducts(action.payload)),
    switchMap(_ => of(new GetProducts()))
  );
}
