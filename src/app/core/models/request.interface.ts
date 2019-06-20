export interface IRequestState {
  request: ERequestState;
  description: string;
}

export enum ERequestState {
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success'
}
