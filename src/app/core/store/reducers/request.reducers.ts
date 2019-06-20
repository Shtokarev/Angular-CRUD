import { ERequestActions, RequestActions } from '@app/core/store/actions';
import { initialRequestState, IRequestState } from '@app/core/store/state';
import { ERequestState } from '@app/core/models';

export const requestReducers = (
  state = initialRequestState,
  action: RequestActions
): IRequestState => {
  switch (action.type) {
    case ERequestActions.SetLoading:
      return {
        request: ERequestState.Loading,
        description: ''
      };

    case ERequestActions.SetSuccess:
      return {
        request: ERequestState.Success,
        description: ''
      };

    case ERequestActions.SetError:
      return {
        request: ERequestState.Error,
        description: action.payload
      };
  }

  return state;
};
