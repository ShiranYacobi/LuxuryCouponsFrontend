import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialModel";
import { currentMenuAction, isLoggedAction, loginAction } from "../../../Redux/AuthState";
import notify from "../../../Services/Notify/Notify";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import { myStore } from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";

const eye = <VisibilityOffIcon />;

function Login(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  async function send(credential: CredentialsModel) {
    try {
      const response = await axios.post<UserModel>(
        "http://localhost:8080/"+credential.clientType+"/login",credential
      );
      myStore().store.dispatch(loginAction(response.data));
      myStore().store.dispatch(isLoggedAction(true));
      myStore().store.dispatch(currentMenuAction(credential.clientType));
      notify.success("you have been successfully logged in !!!");
      history.push("/home");
    } catch (err) {
      notify.error(err.response.data);
    }
  }

  return (
    <div className="Login Box">
      <Typography variant="h3" className="HeadLine">
        LOGIN
      </Typography>
      <br />
      <form onSubmit={handleSubmit(send)}>
        <Form.Label>Client type</Form.Label>
        <br />
        <div className="custom-select">
          <select
            name="clientType"
            ref={register({ required: "Must choose client type" })}
          >
            <option value="ADMIN">Administrator</option>
            <option value="COMPANY">Company</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </div>
        <br />
        <Form.Label>Email address</Form.Label>
        <br />
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="Enter email"
          ref={register}
        />
        <Form.Label>Password</Form.Label>
        <br />
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
          login
        </Button>
      </form>
    </div>
  );
}

export default Login;
