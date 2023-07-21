import { createAction, props } from "@ngrx/store";
import { User,} from "./state";

export const logIn = createAction('[login] login user', props<{user: User}>())
