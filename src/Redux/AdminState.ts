import Company from "../Models/CompanyModel";
import Customer from "../Models/CustomerModel";

export class AdminState {
    public companies: Company[] = [];
    public customers: Customer[] = [];
}

export enum AdminActionType {
    Logout = "Logout",
    AddCompany = "AddCompany",
    UpdateCompany = "UpdateCompany",
    DeleteCompany = "DeleteCompany",
    GetAllCompanies = "GetAllCompanies",
    Register = "Register",
    UpdateAdminCustomer = "UpdateAdminCustomer",
    DeleteCustomer = "DeleteCustomer",
    GetAllCustomers = "GetAllCustomers",
}

export interface AdminAction {
    type: AdminActionType,
    payload?: any
}

export function logoutAdminAction(): AdminAction {
    return { type: AdminActionType.Logout }
}

export function AddCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.AddCompany, payload: company }
}
export function UpdateCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.UpdateCompany, payload: company }
}
export function DeleteCompanyAction(company: Company): AdminAction {
    return { type: AdminActionType.DeleteCompany, payload: company }
}
export function GetAllCompaniesAction(companies: Company[]): AdminAction {
    return { type: AdminActionType.GetAllCompanies, payload: companies }
}
export function RegisterAction(customer: Customer): AdminAction {
    return { type: AdminActionType.Register, payload: customer }
}
export function UpdateAdminCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.UpdateAdminCustomer, payload: customer }
}
export function DeleteCustomerAction(customer: Customer): AdminAction {
    return { type: AdminActionType.DeleteCustomer, payload: customer }
}
export function GetAllCustomersAction(customers: Customer[]): AdminAction {
    return { type: AdminActionType.GetAllCustomers, payload: customers }
}

export function adminReducer(initialState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...initialState };
    switch (action.type) {
        case AdminActionType.AddCompany:
            newState.companies.push(action.payload);
            return newState;

        case AdminActionType.UpdateCompany:
            newState.companies.splice(parseInt(action.payload.companyId) - 1, 1, action.payload);
            return newState;

        case AdminActionType.DeleteCompany:
            newState.companies.splice(action.payload);
            return newState;

        case AdminActionType.GetAllCompanies:
            newState.companies = action.payload;
            return newState;

        case AdminActionType.Register:
            newState.customers.push(action.payload);
            return newState;

        case AdminActionType.UpdateAdminCustomer:
            newState.customers.splice(parseInt(action.payload.customerId) -1, 1, action.payload);
            return newState;

        case AdminActionType.DeleteCustomer:
            newState.customers.splice(action.payload);
            return newState;

        case AdminActionType.GetAllCustomers:
            newState.customers = action.payload;
            return newState;

        case AdminActionType.Logout:
            newState.companies = [];
            newState.customers = [];
            localStorage.clear();
            return newState;

        default:
            return initialState;
    }
}