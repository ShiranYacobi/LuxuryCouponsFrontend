import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Coupon from "../../../../../Models/CouponModel";
import { logoutAuthAction } from "../../../../../Redux/AuthState";
import { PurchaseCouponAction } from "../../../../../Redux/CustomerState";
import { myStore } from "../../../../../Redux/Store";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import notify from "../../../../../Services/Notify/Notify";

interface CouponDataProps {
  coupon: Coupon;
}

function CouponData(props: CouponDataProps): JSX.Element {
  const history = useHistory();

  async function purchase(coupon: Coupon) {
    if (myStore().store.getState().authState.isLogged === false) {
      notify.error("You need to login first !");
      history.push("/login");
    } else {
      try {
        if (decodeGetType() === ClientType.CUSTOMER) {
          const response = await JwtAxios.post<Coupon>(
            "http://localhost:8080/CUSTOMER/addPurchaseCoupon",
            coupon
          );
          const myResponse = response.data;
          coupon.couponId = myResponse.couponId;
          myStore().store.dispatch(PurchaseCouponAction(coupon));
          notify.success("Coupon " + coupon.title + " purchased successfully");
        } else if (decodeGetType() === ClientType.COMPANY || ClientType.ADMIN) {
          notify.error("You need to sign in as a customer first !");
        }
      } catch (err) {
        if(err.response.status === 500){
          myStore().store.dispatch(logoutAuthAction())
      }
        notify.error(err.response.data);
      }
    }
  }

  return (
    <div className="SingleCoupon">
      <div className="tab-content">
        <div className="tab-pane fade active in" id="coupon">
          <div className="col-sm-3">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
                  <img
                    height="200"
                    src={`data:image/png;base64,${props.coupon.image}`}
                    alt="Coupon Image"
                  />
                  <h2>{props.coupon.title}</h2>
                  <h4>{props.coupon.price}$</h4>
                </div>
                <div className="product-overlay">
                  <div className="overlay-content">
                  <h2>{props.coupon.title}</h2>
                  <h4>{props.coupon.price}$</h4>
                  <p>
                    {props.coupon.description}<br />
                    {new Date(
                      props.coupon.startDate
                    ).toLocaleDateString()} -{" "}
                    {new Date(props.coupon.endDate).toLocaleDateString()}<br />
                    Category: {props.coupon.category.toLocaleLowerCase()}
                  </p>
                  <i className="fa fa-shopping-cart"></i>
                  <Button
                    size="large"
                    color="primary"
                    onClick={() => {
                      purchase(props.coupon);
                    }}
                  >
                    Purchase
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponData;
