import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '@app/core/store/state';
import { productReducers } from './product.reducers';
import { requestReducers } from './request.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  product: productReducers,
  request: requestReducers
};
