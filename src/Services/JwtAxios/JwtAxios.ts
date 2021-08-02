import axios from "axios";
import { loginAction } from "../../Redux/AuthState";
import { myStore } from "../../Redux/Store";

const JwtAxios = axios.create();

JwtAxios.interceptors.request.use(request => {
    request.headers = {
        "Authorization": myStore().store.getState().authState.user
    }
    return request;
});

JwtAxios.interceptors.response.use(response => {
    myStore().store.dispatch(loginAction(response.headers.authorization));
    return response;
});

export default JwtAxios;