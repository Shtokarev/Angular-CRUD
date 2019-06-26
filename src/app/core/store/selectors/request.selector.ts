import { createSelector } from '@ngrx/store';

import { IAppState, IRequestState } from '@app/core/store/state';
import { ERequestState } from '@app/core/models';

const selectRequest = (state: IAppState) => state.request;

export const selectRequestState = createSelector(
  selectRequest,
  (state: IRequestState) => state.request
);

export const selectRequestDescription = createSelector(
  selectRequest,
  (state: IRequestState) =>
    state.request === ERequestState.Error ? state.description : ''
);
