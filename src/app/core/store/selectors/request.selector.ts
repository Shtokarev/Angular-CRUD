import { createSelector } from '@ngrx/store';

import { IAppState, IRequestState } from '@app/core/store/state';

const selectRequest = (state: IAppState) => state.request;

export const selectRequestState = createSelector(
  selectRequest,
  (state: IRequestState) => state.request
);
