import { createAction, props } from "@ngrx/store";
import { AppState, User,} from "./state";

export const logIn = createAction('[login] login user', props<{user: User}>())

export const Path = createAction('[edit] path', props<{path: string}>())

export const Token = createAction('[token] token', props<{token: string}>())

export const App = createAction('[app] app', props<{app: AppState}>())

export const Loading = createAction('[loading] loading', props<{loading: boolean}>())





