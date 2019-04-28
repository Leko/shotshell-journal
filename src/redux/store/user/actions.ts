import { User } from "./state";
import { SET_USER } from "./types";

export const setUser = (user: User) => ({
  type: SET_USER,
  user
});

export type Action = ReturnType<typeof setUser>;
