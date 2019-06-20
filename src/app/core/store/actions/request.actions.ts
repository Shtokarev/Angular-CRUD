import { Action } from '@ngrx/store';

export enum ERequestActions {
  SetLoading = '[Request] Loading',
  SetSuccess = '[Request] SetSuccess',
  SetError = '[Request] SetError'
}

export class SetLoading implements Action {
  public readonly type = ERequestActions.SetLoading;
}

export class SetSuccess implements Action {
  public readonly type = ERequestActions.SetSuccess;
}

export class SetError implements Action {
  public readonly type = ERequestActions.SetError;
  constructor(public payload: string) {}
}

export type RequestActions = SetLoading | SetSuccess | SetError;
