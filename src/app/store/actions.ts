import { createAction, props } from "@ngrx/store";
import { User,} from "./state";

export const logIn = createAction('[login] login user', props<{user: User}>())

export const Path = createAction('[edit] path', props<{path: string}>())

export const Token = createAction('[token] token', props<{token: string}>())

