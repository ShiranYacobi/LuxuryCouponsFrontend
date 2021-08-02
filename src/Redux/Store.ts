import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminReducer } from "./AdminState";
import { authReducer } from "./AuthState";
import { companyReducer } from "./CompanyState";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { customerReducer } from "./CustomerState";

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({ authState: authReducer, adminState: adminReducer, companyState: companyReducer, customerState: customerReducer});
const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = composeWithDevTools();
let store = createStore(
    persistedReducer,
    composeEnhancers
);

let persistor = persistStore(store);

export const myStore = () => { 
    return {store, persistor}
}