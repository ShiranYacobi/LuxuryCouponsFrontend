import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAdminAction } from "../../../Redux/AdminState";
import { logoutAuthAction } from "../../../Redux/AuthState";
import { logoutCompanyAction } from "../../../Redux/CompanyState";
import { LogoutCustomerAction } from "../../../Redux/CustomerState";
import { myStore } from "../../../Redux/Store";
import notify from "../../../Services/Notify/Notify";

function Logout(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
        myStore().store.dispatch(logoutAuthAction());
        myStore().store.dispatch(logoutCompanyAction());
        myStore().store.dispatch(logoutAdminAction());
        myStore().store.dispatch(LogoutCustomerAction());
        notify.success("You have successfully logged out!")
        localStorage.removeItem("persist:root")
        history.push("/home");
    });
    return null;
}

export default Logout;