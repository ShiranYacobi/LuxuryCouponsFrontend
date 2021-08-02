import { ClientType } from "../Models/ClientTypeModel";
import UserModel from "../Models/UserModel";

export class AuthState {
    public user: UserModel
    public isLogged: boolean = false
    public currentMenu: ClientType = ClientType.GUEST
}

export enum AuthActionType {
    Login = "Login",
    Logout = "Logout",
    isLogged = "isLogged",
    currentMenu = "currentMenu"
}

export interface AuthAction {
    type: AuthActionType,
    payload?: any
}

export function loginAction(user: UserModel): AuthAction {
    return { type: AuthActionType.Login, payload: user }
}

export function logoutAuthAction(): AuthAction {
    return { type: AuthActionType.Logout }
}

export function isLoggedAction(isLogged: boolean): AuthAction {
    return { type: AuthActionType.isLogged, payload: isLogged }
}

export function currentMenuAction(currentMenu: ClientType): AuthAction {
    return { type: AuthActionType.currentMenu, payload: currentMenu }
}

export function authReducer(initialState: AuthState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...initialState };

    switch (action.type) {
        case AuthActionType.Login:
            localStorage.removeItem("user");
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            return newState;

        case AuthActionType.isLogged:
            newState.isLogged = action.payload;
            return newState;

        case AuthActionType.currentMenu:
            newState.currentMenu = action.payload;
            return newState;

        case AuthActionType.Logout:
            newState.isLogged = false;
            newState.user = null;
            newState.currentMenu = ClientType.GUEST
            localStorage.clear();
            return newState;

        default:
            return initialState
    }
}