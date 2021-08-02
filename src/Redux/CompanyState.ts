import Company from "../Models/CompanyModel";
import Coupon from "../Models/CouponModel";

export class CompanyState {
    public Coupons: Coupon[] = [];
    public company: Company = new Company;
}

export enum CompanyActionType {
    Logout = "Logout",
    AddCoupon = "AddCoupon",
    UpdateCoupon = "UpdateCoupon",
    DeleteCoupon = "DeleteCoupon",
    GetCompanyCoupons = "GetCompanyCoupons",
    GetCompanyDetails = "GetCompanyDetails"
}

export interface CompanyAction {
    type: CompanyActionType,
    payload?: any
}

export function logoutCompanyAction(): CompanyAction {
    return { type: CompanyActionType.Logout }
}

export function AddCouponAction(coupon: Coupon): CompanyAction {
    return { type: CompanyActionType.AddCoupon, payload: coupon }
}
export function UpdateCouponAction(coupon: Coupon): CompanyAction {
    return { type: CompanyActionType.UpdateCoupon, payload: coupon }
}
export function DeleteCouponAction(coupon: Coupon): CompanyAction {
    return { type: CompanyActionType.DeleteCoupon, payload: coupon }
}
export function GetCompanyCouponsAction(coupons: Coupon[]): CompanyAction {
    return { type: CompanyActionType.GetCompanyCoupons, payload: coupons }
}
export function GetCompanyDetailsAction(company: Object): CompanyAction {
    return { type: CompanyActionType.GetCompanyDetails, payload: company }
}

export function companyReducer(initialState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {
    const newState = { ...initialState };
    switch (action.type) {
        case CompanyActionType.AddCoupon:
            newState.Coupons.push(action.payload);
            return newState;

        case CompanyActionType.UpdateCoupon:
            newState.Coupons.splice(parseInt(action.payload.couponId) - 1, 1, action.payload);
            return newState;

        case CompanyActionType.DeleteCoupon:
            newState.Coupons.splice(action.payload);
            return newState;

        case CompanyActionType.GetCompanyCoupons:
            newState.Coupons = action.payload;
            return newState;

        case CompanyActionType.GetCompanyDetails:
            newState.company = action.payload;
            return newState;

        case CompanyActionType.Logout:
            newState.Coupons = [];
            newState.company = new Company;
            localStorage.clear()
            return newState;

        default:
            return initialState;
    }
}