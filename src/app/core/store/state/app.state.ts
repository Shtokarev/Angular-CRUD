import { IProductState, initialProductState } from './product.state';
import { initialRequestState, IRequestState } from './request.state';

export interface IAppState {
  product: IProductState;
  request: IRequestState;
}

export const initialAppState: IAppState = {
  product: initialProductState,
  request: initialRequestState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
