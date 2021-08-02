import { useSelector } from "react-redux";
import { ClientType } from "../../../Models/ClientTypeModel";
import { myStore } from "../../../Redux/Store";
import decodeGetType from "../../../Services/decodeUserType/decodeGetType";
import AdminMenu from "./Admin/AdminMenu/AdminMenu";
import CompanyMenu from "./Company/CompanyMenu/CompanyMenu";
import CustomerMenu from "./Customer/CustomerMenu/CustomerMenu";

function MenuManager(): JSX.Element {
    useSelector(myStore().store.getState);
    try {
        if (decodeGetType() === ClientType.ADMIN) {
            return <AdminMenu />
        }
        if (decodeGetType() === ClientType.COMPANY) {
            return <CompanyMenu />
        }
        if (decodeGetType() === ClientType.CUSTOMER) {
            return <CustomerMenu />
        }
    } catch {
        return null;
    }
}

export default MenuManager;