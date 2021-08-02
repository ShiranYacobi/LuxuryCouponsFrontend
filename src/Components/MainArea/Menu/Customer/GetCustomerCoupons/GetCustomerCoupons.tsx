import { Checkbox, createMuiTheme, Divider, Grid, MuiThemeProvider, TablePagination, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Coupon from "../../../../../Models/CouponModel";
import { GetCustomerCouponsAction } from "../../../../../Redux/CustomerState";
import { myStore } from "../../../../../Redux/Store";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import notify from "../../../../../Services/Notify/Notify";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Category } from "../../../../../Models/CategoryModel";
import { logoutAuthAction } from "../../../../../Redux/AuthState";

function GetCustomerCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [preferDarkMode, setPreferDarkMode] = useState(false);
    const [filter, setFilter] = useState(false);
    const theme = createMuiTheme({
        palette: {
            type: preferDarkMode ? "dark" : "light"
        }
    });

    const fetchCoupons = async () => {
        try {
            if (decodeGetType() === ClientType.CUSTOMER) {
                const { data: coupons }: { data: Coupon[] } = await JwtAxios.get("http://localhost:8080/CUSTOMER/getCustomerCoupons");
                setCoupons(coupons);
                myStore().store.dispatch(GetCustomerCouponsAction(coupons));
            }
        } catch (err){
            if(err.response.status === 500){
                myStore().store.dispatch(logoutAuthAction())
            }
            notify.error(err.response.data);
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <div className="getCustomerCoupons getAll">
            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    title={<h3>COUPONS LIST</h3>}
                    data={coupons}
                    columns={[
                        {
                            title: "Title", field: "title", type: 'string', validate: (rowData: { title: string; }) => (rowData.title === undefined || rowData.title === "") ? "Required" : true
                        },
                        {
                            title: "Category", field: "category", lookup:
                            { FASHION: "FASHION", RESTAURANT: "RESTAURANT", VACATION: "VACATION", COSMETICS: "COSMETICS", ELECTRICITY: "ELECTRICITY" },
                            validate: (rowData: { category: Category; }) => (rowData.category === undefined) ? "Required" : true
                        },
                        {
                            title: "Price", field: "price", type: 'numeric', validate: (rowData: { price: number; }) => (rowData.price === 0 || rowData.price === undefined || rowData.price < 0) ? { isValid: false, helperText: "cannot be zero / under" } : true,
                            customFilterAndSearch: (term, rowData) => rowData.price <= term                        
                        },
                        {
                            title: "Start", field: "startDate", type: 'date', validate: (rowData: { startDate: Date; }) => (rowData.startDate === undefined) ? "Required" : true
                        },
                        {
                            title: "End", field: "endDate", type: 'date', validate: (rowData: { endDate: Date; }) => (rowData.endDate === undefined) ? "Required" : true
                        },
                        {
                            title: "Description", field: "description", type: 'string', validate: (rowData: { description: string; }) => (rowData.description === undefined || rowData.description === "") ? "Required" : true
                        },
                        {
                            title: "Image", field: "image", render: item => <img width='100' height='100' src={`data:image/png;base64,${item.image}`}/>                        
                        }
                    ]}
                    actions={[
                        {
                            icon: () => preferDarkMode ? <Brightness4Icon /> : <Brightness7Icon />,
                            tooltip: "Light / Dark",
                            onClick: () => { setPreferDarkMode(!preferDarkMode) },
                            isFreeAction: true
                        },
                        {
                            icon: () => <Checkbox
                                checked={filter}
                                onChange={() => {
                                    setFilter(!filter)
                                }}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />,
                            tooltip: "Hide / Show Filter",
                            onClick: () => { setFilter(!filter) },
                            isFreeAction: true
                        }
                    ]}
                    components={{
                        Pagination: (props) => <div>
                            <Grid container style={{ padding: 15 }}>
                                <Grid><Typography variant="h5" style={{ fontWeight: 'bolder' }}>Total coupons: {props.count} </Typography></Grid>
                            </Grid>
                            <Divider />
                            <TablePagination {...props} />
                        </div>
                    }}
                    options={{
                        filtering: filter,
                        actionsColumnIndex: -1,
                        addRowPosition: "first",
                        exportButton: true,
                        headerStyle: {
                            fontWeight: 'bolder',
                            fontSize: '14px'
                        },
                        searchFieldStyle: {
                            fontSize: '14px'
                        }
                    }}
                />
            </MuiThemeProvider>
        </div>
    );
}

export default GetCustomerCoupons;
