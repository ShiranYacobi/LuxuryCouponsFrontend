import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import Customer from "../../../../../Models/CustomerModel";
import { useForm } from "react-hook-form";
import { useState } from "react";
import notify from "../../../../../Services/Notify/Notify";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import { Button, Typography } from "@material-ui/core";
import { RegisterAction } from "../../../../../Redux/AdminState";
import {  Form } from "react-bootstrap";
import { myStore } from "../../../../../Redux/Store";
import { logoutAuthAction } from "../../../../../Redux/AuthState";

const eye = <VisibilityOffIcon />;

function Register(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<Customer>();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  async function send(customer: Customer) {
    try {
        const response = await JwtAxios.post<Customer>(
          "http://localhost:8080/guest/register",
          customer
        );
        const myResponse = response.data;
        customer.customerId = myResponse.customerId;
        myStore().store.dispatch(RegisterAction(customer));
        notify.success(
          "Welcome " +
            customer.firstName +
            " " +
            customer.lastName +
            "<br/>Please login!"
        );
        history.push("/home");
    } catch (err){
      if(err.response.status === 500){
        myStore().store.dispatch(logoutAuthAction())
      }
      notify.error(err.response.data);
    }
  }

  return (
    <div className="Register Box">
      <Typography variant="h3" className="HeadLine">
        SIGN UP
      </Typography>
      <br />
      <form onSubmit={handleSubmit(send)}>
        <Form.Label>First name</Form.Label>
        <br />
        <Form.Control
          required
          type="text"
          name="firstName"
          placeholder="First name"
          ref={register}
        />
        <br />
        <Form.Label>Last name</Form.Label>
        <br />
        <Form.Control
          required
          type="text"
          name="lastName"
          placeholder="Last name"
          ref={register}
        />
        <br />
        <Form.Label>Email</Form.Label>
        <br />
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="Enter email"
          ref={register}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          required
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          ref={register}
        />
        <i onClick={togglePasswordVisibility}>{eye}</i>
        <br />
        <br />
        <Button
          variant="outlined"
          type="submit"
          className="login_button"
          size="large"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default Register;
