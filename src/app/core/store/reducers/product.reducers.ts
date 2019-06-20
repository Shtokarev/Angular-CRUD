import { EProductActions, ProductActions } from '@app/core/store/actions';
import { initialProductState, IProductState } from '@app/core/store/state';

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.SetProducts:
      return {
        ...state,
        products: [...action.payload]
      };

    case EProductActions.SetCurrectProduct:
      return {
        ...state,
        selectedProduct: action.payload
      };
  }

  return state;
};
