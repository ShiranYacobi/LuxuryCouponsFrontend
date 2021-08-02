import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Customer from "../../../../../Models/CustomerModel";
import { logoutAuthAction } from "../../../../../Redux/AuthState";
import { GetCustomerCouponsAction, GetCustomerDetailsAction } from "../../../../../Redux/CustomerState";
import { myStore } from "../../../../../Redux/Store";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import notify from "../../../../../Services/Notify/Notify";

function GetCustomerDetails(): JSX.Element {

    const [myCustomer, setMyCustomer] = useState<Customer>();

    const fetchCustomer = async () => {
        try {
            couponsIfNull();
            if (myStore().store.getState().customerState.coupons.length == 0) {
                const { data: myCustomer }: { data: Customer } = await JwtAxios.get("http://localhost:8080/CUSTOMER/getDetails");
                myStore().store.dispatch(GetCustomerDetailsAction(myCustomer));
                setMyCustomer(myCustomer);
            }
        } catch (err){
            if(err.response.status === 500){
                myStore().store.dispatch(logoutAuthAction())
            }
            notify.error(err.response.data);
        }
    }

    useEffect(() => {
        fetchCustomer();
    }, []);

    const couponsIfNull = async () => {
    try{    
        const { data: coupons } = await JwtAxios.get("http://localhost:8080/CUSTOMER/getCustomerCoupons");
        myStore().store.dispatch(GetCustomerCouponsAction(coupons));
    }
     catch (err) {
        if(err.response.status === 500){
         myStore().store.dispatch(logoutAuthAction())
        }
     notify.error(err.response.data);
    }
}

    return (
        <div className="GetCustomerDetails Box">
            <h3>Account Details</h3>
            <Form.Label>Name: </Form.Label>
            {myStore().store.getState().customerState.customer.firstName} {myStore().store.getState().customerState.customer.lastName}<br />
            <Form.Label>Email: </Form.Label>
            {myStore().store.getState().customerState.customer.email}<br />
            <Form.Label>Password: </Form.Label>
            {myStore().store.getState().customerState.customer.password}<br />
            <Form.Label>Coupons: </Form.Label>
            {myStore().store.getState().customerState.coupons.length}
        </div>
    );
}

export default GetCustomerDetails;