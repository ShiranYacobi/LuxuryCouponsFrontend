import { Button, Typography } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Coupon from "../../../../../Models/CouponModel";
import { isLoggedAction, logoutAuthAction } from "../../../../../Redux/AuthState";
import { AddCouponAction } from "../../../../../Redux/CompanyState";
import { myStore } from "../../../../../Redux/Store";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import notify from "../../../../../Services/Notify/Notify";

function AddCoupon(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit } = useForm<Coupon>();
    const myFormData = new FormData();

    async function send(coupon: Coupon) {
        try {
            if (decodeGetType() === ClientType.COMPANY) {
                myFileHandler(coupon) 
                const response = await JwtAxios.post<Coupon>(
                    "http://localhost:8080/COMPANY/addCoupon",
                    myFormData
                );
                const myResponse = response.data;
                myStore().store.dispatch(AddCouponAction(myResponse));
                notify.success("New coupon added to the system");
                history.push("/getCompanyCoupons");
            }
        } catch (err){
            if(err.response.status === 500){
                myStore().store.dispatch(logoutAuthAction())
            }
            notify.error(err.response.data);
        }
    }

    const myFileHandler = (coupon: Coupon) => {
        myFormData.append("title", coupon.title);
        myFormData.append("price", coupon.price.toString());
        myFormData.append("amount", coupon.amount.toString());
        myFormData.append("category", coupon.category);
        myFormData.append("description", coupon.description);
        myFormData.append("startDate", new Date (coupon.startDate).toUTCString());
        myFormData.append("endDate", new Date (coupon.endDate).toUTCString());
        myFormData.append("image", coupon.image.item(0));
    };

    return (
        <div className="AddCoupon Box">
            <Typography variant="h4" className="HeadLine">
                <b>Add Coupon</b>
            </Typography>
            <br />
            <form onSubmit={handleSubmit(send)}>
                <Form.Label>Coupon title</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    ref={register}
                />
                <br />
                < div className="custom-select">
                    <select name="category" ref={register}>
                        <option value="ELECTRICITY">ELECTRICITY</option>
                        <option value="RESTAURANT">RESTAURANT</option>
                        <option value="VACATION">VACATION</option>
                        <option value="FASHION">FASHION</option>
                        <option value="COSMETICS">COSMETICS</option>
                    </select>
                </div>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    ref={register}
                />
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    required
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    ref={register}
                />
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                    required
                    type="date"
                    name="startDate"
                    placeholder="Enter start date"
                    ref={register}
                />
                <Form.Label>End Date</Form.Label>
                <Form.Control
                    required
                    type="date"
                    name="endDate"
                    placeholder="Enter end date"
                    ref={register}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    ref={register}
                />
                <Form.Label>Image</Form.Label>
                <Form.Control
                    required
                    type="file"
                    name="image"
                    placeholder="Enter image"
                    ref={register}
                />
                <br />
                <br />
                <Button
                    variant="outlined"
                    type="submit"
                    className="login_button"
                    size="large"
                >
                    Add
                </Button>
            </form>
        </div >
    );
}

export default AddCoupon;