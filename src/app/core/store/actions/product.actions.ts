import { Action } from '@ngrx/store';

import { IProduct } from '@app/core/models';

export enum EProductActions {
  CreateProduct = '[Product] Create Product',
  UpdateProduct = '[Product] Update Product',
  DeleteProduct = '[Product] Delete Product',
  SetProducts = '[Product] SetProducts',
  GetProducts = '[Product] Get Products',
  SetCurrectProduct = '[Product] Set current Product'
}

export class CreateProduct implements Action {
  public readonly type = EProductActions.CreateProduct;
  constructor(public payload: IProduct) {}
}

export class UpdateProduct implements Action {
  public readonly type = EProductActions.UpdateProduct;
  constructor(public payload: IProduct) {}
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public payload: IProduct) {}
}

export class SetProducts implements Action {
  public readonly type = EProductActions.SetProducts;
  constructor(public payload: IProduct[]) {}
}

export class GetProducts implements Action {
  public readonly type = EProductActions.GetProducts;
}

export class SetCurrectProduct implements Action {
  public readonly type = EProductActions.SetCurrectProduct;
  constructor(public payload: IProduct) {}
}

export type ProductActions =
  | CreateProduct
  | UpdateProduct
  | DeleteProduct
  | SetProducts
  | GetProducts
  | SetCurrectProduct;
