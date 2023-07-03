import { Action } from "@ngrx/store";

export enum actionsTypes {
  LoadUser = '[app] Load User'
}

export class LoadUser implements Action{
  readonly type = actionsTypes.LoadUser;
}
