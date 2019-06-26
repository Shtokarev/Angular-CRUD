import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { IAppState } from '@app/core/store/state';
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  SetProducts,
  GetProducts,
  EProductActions,
  SetLoading,
  SetSuccess,
  SetError
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
      return this.userService.getProducts().pipe(
        switchMap((userHttp: IProductsHttp) => {
          this.store.dispatch(new SetSuccess());
          return of(new SetProducts(userHttp.products));
        }),
        catchError(error => of(new SetError(error)))
      );
    })
  );

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType<CreateProduct>(EProductActions.CreateProduct),
    switchMap(action =>
      this.userService.postProducts(action.payload).pipe(
        switchMap(_ => of(new GetProducts())),
        catchError(error => of(new SetError(error)))
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType<UpdateProduct>(EProductActions.UpdateProduct),
    switchMap(action =>
      this.userService.updateProducts(action.payload).pipe(
        switchMap(_ => of(new GetProducts())),
        catchError(error => of(new SetError(error)))
      )
    )
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType<DeleteProduct>(EProductActions.DeleteProduct),
    switchMap(action =>
      this.userService.deleteProducts(action.payload).pipe(
        switchMap(_ => of(new GetProducts())),
        catchError(error => of(new SetError(error)))
      )
    )
  );
}
