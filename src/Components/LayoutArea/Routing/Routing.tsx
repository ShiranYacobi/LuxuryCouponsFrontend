import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../../MainArea/Home/HomePage/Home";
import Login from "../../MainArea/Login/Login";
import Logout from "../../MainArea/Logout/Logout";
import AdminMenu from "../../MainArea/Menu/Admin/AdminMenu/AdminMenu";
import UpdateCustomer from "../../MainArea/Menu/Customer/UpdateCustomer/UpdateCustomer";
import CompanyMenu from "../../MainArea/Menu/Company/CompanyMenu/CompanyMenu";
import Page404 from "../../MainArea/Page404/Page404";
import ContactUs from "../Footer/ContactUs";
import Register from "../../MainArea/Menu/Guest/Register/Register";
import CustomerMenu from "../../MainArea/Menu/Customer/CustomerMenu/CustomerMenu";
import GetAllCustomers from "../../MainArea/Menu/Admin/GetCustomers/GetAllCustomers";
import GetAllCompanies from "../../MainArea/Menu/Admin/GetAllCompanies/GetAllCompanies";
import GetCompanyCoupons from "../../MainArea/Menu/Company/GetCompanyCoupons/GetCompanyCoupons";
import GetCompanyDetails from "../../MainArea/Menu/Company/GetCompanyDetails/GetCompanyDetails";
import AddCoupon from "../../MainArea/Menu/Company/AddCoupon/AddCoupon";
import GetCustomerDetails from "../../MainArea/Menu/Customer/GetCustomerDetails/GetCustomerDetails";
import GetCustomerCoupons from "../../MainArea/Menu/Customer/GetCustomerCoupons/GetCustomerCoupons";
import CouponsStore from "../../MainArea/Menu/Store/CouponStore/CouponStore";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route exact path="/home" component={Home} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/register" component={Register} />

                <Route exact path="/admin" component={AdminMenu} />
                <Route exact path="/getAllCompanies" component={GetAllCompanies} />
                <Route exact path="/getAllCustomers" component={GetAllCustomers} />
                
                <Route exact path="/company" component={CompanyMenu} />
                <Route exact path="/getCompanyCoupons" component={GetCompanyCoupons} />
                <Route exact path="/getCompanyDetails" component={GetCompanyDetails} />
                <Route exact path="/addCoupon" component={AddCoupon} />

                <Route exact path="/customer" component={CustomerMenu} />
                <Route exact path="/updateCustomer" component={UpdateCustomer} />
                <Route exact path="/getCustomerDetails" component={GetCustomerDetails} />
                <Route exact path="/getCustomerCoupons" component={GetCustomerCoupons} />

                <Route exact path="/store" component={CouponsStore} />

                <Route exact path="/contactUs" component={ContactUs} />

                <Redirect exact from="/" to="/home" />
                <Route component={Page404} />
            </Switch>
        </div>
    );
}

export default Routing;
