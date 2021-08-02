class Globals{

}

class DevelopmentGlobals extends Globals{
    public urls = {
        home: "http://localhost:3000/home",
        login: "http://localhost:3000/login",
        logout: "http://localhost:3000/logout",
        register: "http://localhost:3000/register",
        adminMenu: "http://localhost:3000/admin",
        getAllCompanies: "http://localhost:3000/getAllCompanies",
        getAllCustomers: "http://localhost:3000/getAllCustomers",
        companyMenu: "http://localhost:3000/company",
        getCompanyCoupons: "http://localhost:3000/getCompanyCoupons",
        getCompanyDetails: "http://localhost:3000/getCompanyDetails",
        addCoupon: "http://localhost:3000/addCoupon",
        customerMenu: "http://localhost:3000/customer",
        updateCustomer: "http://localhost:3000/updateCustomer",
        getCustomerDetails: "http://localhost:3000/getCustomerDetails",
        getCustomerCoupons: "http://localhost:3000/getCustomerCoupons",
        store: "http://localhost:3000/store",
        contactUs: "http://localhost:3000/contactUs"
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        home: "https://luxury-coupons-shiran.web.app/home",
        login: "https://luxury-coupons-shiran.web.app/login",
        logout: "https://luxury-coupons-shiran.web.app/logout",
        register: "https://luxury-coupons-shiran.web.app/register",
        adminMenu: "https://luxury-coupons-shiran.web.app/admin",
        getAllCompanies: "https://luxury-coupons-shiran.web.app/getAllCompanies",
        getAllCustomers: "https://luxury-coupons-shiran.web.app/getAllCustomers",
        companyMenu: "https://luxury-coupons-shiran.web.app/company",
        getCompanyCoupons: "https://luxury-coupons-shiran.web.app/getCompanyCoupons",
        getCompanyDetails: "https://luxury-coupons-shiran.web.app/getCompanyDetails",
        addCoupon: "https://luxury-coupons-shiran.web.app/addCoupon",
        customerMenu: "https://luxury-coupons-shiran.web.app/customer",
        updateCustomer: "https://luxury-coupons-shiran.web.app/updateCustomer",
        getCustomerDetails: "https://luxury-coupons-shiran.web.app/getCustomerDetails",
        getCustomerCoupons: "https://luxury-coupons-shiran.web.app/getCustomerCoupons",
        store: "https://luxury-coupons-shiran.web.app/store",
        contactUs: "https://luxury-coupons-shiran.web.app/contactUs"
    }
}

const globals = process.env.NODE_ENV === "development" ? DevelopmentGlobals:ProductionGlobals

export default globals;