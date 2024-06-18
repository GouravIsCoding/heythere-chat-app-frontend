import { atom } from "recoil";

const defaultState =
  localStorage.getItem("authstatus") === "true" ? true : false;

export const AuthStatusAtom = atom({
  key: "AuthStatus",
  default: defaultState,
});
