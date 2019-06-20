import { IRequestState, ERequestState } from '@app/core/models';
export { IRequestState } from '@app/core/models';

export const initialRequestState: IRequestState = {
  request: ERequestState.Success,
  description: ''
};
