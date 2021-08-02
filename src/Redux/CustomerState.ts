import Coupon from "../Models/CouponModel";
import Customer from "../Models/CustomerModel";

export class CustomerState {
    public coupons: Coupon[] = [];
    public customer: Customer = new Customer;
}

export enum CustomerActionType {
    Logout = "Logout",
    UpdateCustomer = "UpdateCustomer",
    PurchaseCoupon = "PurchaseCoupon",
    GetCustomerCoupons = "GetCustomerCoupons",
    GetCustomerDetails = "GetCustomerDetails"
}

export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}

export function LogoutCustomerAction(): CustomerAction {
    return { type: CustomerActionType.Logout }
}

export function UpdateCustomerAction(customer: Customer): CustomerAction {
    return { type: CustomerActionType.UpdateCustomer, payload: customer }
}

export function PurchaseCouponAction(coupon: Coupon): CustomerAction {
    return { type: CustomerActionType.PurchaseCoupon, payload: coupon }
}

export function GetCustomerCouponsAction(coupons: Coupon[]): CustomerAction {
    return { type: CustomerActionType.GetCustomerCoupons, payload: coupons }
}

export function GetCustomerDetailsAction(customer: Object): CustomerAction {
    return { type: CustomerActionType.GetCustomerDetails, payload: customer }
}

export function customerReducer(initialState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...initialState };
    switch (action.type) {

        case CustomerActionType.UpdateCustomer:
            newState.customer = action.payload;  
            return newState;

        case CustomerActionType.PurchaseCoupon:
            newState.coupons.push(action.payload);
            return newState;

        case CustomerActionType.GetCustomerCoupons:
            newState.coupons = action.payload;
            return newState;

        case CustomerActionType.GetCustomerDetails:
            newState.customer = action.payload;
            return newState;

        case CustomerActionType.Logout:
            newState.coupons = [];
            newState.customer = new Customer;
            localStorage.clear()
            return newState;

        default:
            return initialState;
    }
}