import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IAppState, IProductState } from '@app/core/store/state';

const selectProduct = (state: IAppState) => state.product;

export const selectProductsList = createSelector(
  selectProduct,
  (state: IProductState) => state.products
);

export const selectCurrentProduct = createSelector(
  selectProduct,
  (state: IProductState) => state.selectedProduct
);
