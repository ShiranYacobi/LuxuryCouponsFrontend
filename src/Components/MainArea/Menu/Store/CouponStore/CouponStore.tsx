import axios from "axios";
import { useEffect, useState } from "react";
import Coupon from "../../../../../Models/CouponModel";
import CouponData from "../CouponData/CouponData";
import { Category } from "../../../../../Models/CategoryModel";
import { Button } from "@material-ui/core";
import notify from "../../../../../Services/Notify/Notify";
import { logoutAuthAction } from "../../../../../Redux/AuthState";
import { myStore } from "../../../../../Redux/Store";

function CouponsStore(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    async function allCoupons() {
        try{
        const response = await axios.get("http://localhost:8080/guest/allCoupons");
        const myResponse = response.data;
        setCoupons(myResponse);
        }catch(err){
            if(err.response.status === 500){
                myStore().store.dispatch(logoutAuthAction())
            }
            notify.error(err.response.data)
        }
    }

    async function getCouponsByCategory(category: Category) {
        try{
        const response = await axios.get(
            "http://localhost:8080/guest/category/" +
            category
        );
        const myResponse = response.data;
        setCoupons(myResponse);
        }catch(err){
            if(err.response.status === 500){
                myStore().store.dispatch(logoutAuthAction())
            }
            notify.error(err.response.data)
        }
    }

    useEffect(() => {
        allCoupons();
    }, []);

    return (
        <div className="Store">
            <div className="container">
                <div className="row">
                    <div className="category-tab">
                        <ul className="nav nav-tabs">
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        allCoupons();
                                    }}>
                                    All
                                </Button>
                            </li>
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        getCouponsByCategory(Category.FASHION);
                                    }}
                                >
                                    Fashion
                                </Button>
                            </li>
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        getCouponsByCategory(Category.COSMETICS);
                                    }}
                                >
                                    Cosmetics
                                </Button>
                            </li>
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        getCouponsByCategory(Category.VACATION);
                                    }}
                                >
                                    Vacation
                                </Button>
                            </li>
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        getCouponsByCategory(Category.RESTAURANT);
                                    }}
                                >
                                    Restaurant
                                </Button>
                            </li>
                            <li className="active">
                                <Button
                                    onClick={() => {
                                        getCouponsByCategory(Category.ELECTRICITY);
                                    }}
                                >
                                    Electricity
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
            {coupons.map((coupon: Coupon) => <CouponData key={coupon.couponId} coupon={coupon} />)}
            </div>
        </div >
    );
}

export default CouponsStore;