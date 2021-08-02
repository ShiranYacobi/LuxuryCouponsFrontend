import { Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Customer from "../../../../../Models/CustomerModel";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import notify from "../../../../../Services/Notify/Notify";
import { myStore } from "../../../../../Redux/Store";
import { UpdateCustomerAction } from "../../../../../Redux/CustomerState";
import { logoutAuthAction } from "../../../../../Redux/AuthState";

function UpdateCustomer(): JSX.Element {
    const saveState = myStore().store.getState().adminState.customers;
    const history = useHistory();
    const { register, handleSubmit } = useForm<Customer>();

    async function send(customer: Customer) {
        try {
            if (decodeGetType() === ClientType.CUSTOMER) {
                var nameHolder = customer.customerId;
                saveState.forEach(item => {
                    if (item.customerId === nameHolder){
                        nameHolder = item.firstName;
                    }
                });
                const response = await JwtAxios.put<Customer>("http://localhost:8080/CUSTOMER/updateCustomer", customer);
                customer.firstName = nameHolder;
                myStore().store.dispatch(UpdateCustomerAction(customer));
                notify.success("Update successful!");
                history.push("/home");
            }
        } catch (err) {
            if(err.response.status === 500){
         myStore().store.dispatch(logoutAuthAction())
        }
            notify.error(err.response.data);
        }
    }

    return (
        <div className="UpdateCustomer Box">
			 <Typography variant="h4" className="HeadLine">
                <b>Update Customer</b>
            </Typography><br />
            <form onSubmit={handleSubmit(send)}>
                <input type="text" name="firstName" placeholder="first name" ref={register} /><br /><br />
                <input type="text" name="lastName" placeholder="last name" ref={register} /><br /><br />
                <input type="text" name="email" placeholder="email address" ref={register} /><br /><br />
                <input type="text" name="password" placeholder="password" ref={register} /><br /><br />
                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
