import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { setTimeout } from "timers";
import { Category } from "../../../../../Models/CategoryModel";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Coupon from "../../../../../Models/CouponModel";
import {
  AddCouponAction,
  DeleteCouponAction,
  GetCompanyCouponsAction,
  UpdateCouponAction,
} from "../../../../../Redux/CompanyState";
import { myStore } from "../../../../../Redux/Store";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import {
  TablePagination,
  Typography,
  Checkbox,
  MuiThemeProvider,
  createMuiTheme,
  TablePaginationProps,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import notify from "../../../../../Services/Notify/Notify";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import { isLoggedAction, logoutAuthAction } from "../../../../../Redux/AuthState";

function GetCompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [preferDarkMode, setPreferDarkMode] = useState(false);
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<string>();
  const [filter, setFilter] = useState(false);
  const myFileReader = new FileReader();
  const theme = createMuiTheme({
    palette: {
      type: preferDarkMode ? "dark" : "light",
    },
  });

  //this function is a patch for a bug in material table
  function PatchedPagination(props: TablePaginationProps) {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;
  
    return (
      <TablePagination
        {...tablePaginationProps}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              //@ts-ignore
              onChangePage={onPageChange}
            />
          );
        }}
      />
    );
  }

  const fetchCoupons = async () => {
    try {
      if (decodeGetType() === ClientType.COMPANY) {
        const { data: coupons }: { data: Coupon[] } = await JwtAxios.get(
          "http://localHost:8080/COMPANY/getCompanyCoupons"
        );
        setCoupons(coupons);
        myStore().store.dispatch(GetCompanyCouponsAction(coupons));
      }
    } catch (err) {
      if(err.response.status === 500){
      myStore().store.dispatch(logoutAuthAction())
      }
      notify.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="getCompanyCoupons getAll">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={<h3>COUPONS LIST</h3>}
          data={coupons}
          columns={[
            {
              title: "Title",
              field: "title",
              type: "string",
              validate: (rowData: { title: string }) =>
                rowData.title === undefined || rowData.title === ""
                  ? "Required"
                  : true,
            },
            {
              title: "Category",
              field: "category",
              lookup: {
                FASHION: "FASHION",
                RESTAURANT: "RESTAURANT",
                VACATION: "VACATION",
                COSMETICS: "COSMETICS",
                ELECTRICITY: "ELECTRICITY",
              },
              validate: (rowData: { category: Category }) =>
                rowData.category === undefined ? "Required" : true,
            },
            {
              title: "Price",
              field: "price",
              type: "numeric",
              validate: (rowData: { price: number }) =>
                rowData.price === 0 ||
                rowData.price === undefined ||
                rowData.price < 0
                  ? { isValid: false, helperText: "cannot be zero / under" }
                  : true,
              customFilterAndSearch: (term, rowData) => rowData.price <= term,
            },
            {
              title: "Amount",
              field: "amount",
              type: "numeric",
              validate: (rowData: { amount: number }) =>
                rowData.amount === 0 ||
                rowData.amount === undefined ||
                rowData.amount < 0
                  ? { isValid: false, helperText: "cannot be zero / under" }
                  : true,
            },
            {
              title: "Start",
              field: "startDate",
              type: "date",
              validate: (rowData: { startDate: Date }) =>
                rowData.startDate === undefined ? "Required" : true,
            },
            {
              title: "End",
              field: "endDate",
              type: "date",
              validate: (rowData: { endDate: Date }) =>
                rowData.endDate === undefined ? "Required" : true,
            },
            {
              title: "Description",
              field: "description",
              type: "string",
              validate: (rowData: { description: string }) =>
                rowData.description === undefined || rowData.description === ""
                  ? "Required"
                  : true,
            },
            {
              title: "Image",
              field: "image",
              render: item => <img width='100' height='100' src={`data:image/png;base64,${item.image}`}/>
            },
          ]}
          detailPanel={[
            {
              tooltip: "Show Coupon Image",
              render: (rowData) => {
                return (
                  <div
                    style={{
                      backgroundColor: "gray",
                    }}
                  >
                    {rowData.image}
                  </div>
                );
              },
            },
          ]}
          actions={[
            {
              icon: () =>
                preferDarkMode ? <Brightness4Icon /> : <Brightness7Icon />,
              tooltip: "Light / Dark",
              onClick: () => {
                setPreferDarkMode(!preferDarkMode);
              },
              isFreeAction: true,
            },
            {
              icon: () => (
                <Checkbox
                  checked={filter}
                  onChange={() => {
                    setFilter(!filter);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              ),
              tooltip: "Hide / Show Filter",
              onClick: () => {
                setFilter(!filter);
              },
              isFreeAction: true,
            },
          ]}
          components={
            {
              Pagination: PatchedPagination,
            }}
          options={{
            filtering: filter,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            exportButton: true,
            headerStyle: {
              fontWeight: "bolder",
              fontSize: "14px",
            },
            searchFieldStyle: {
              fontSize: "14px",
            },
          }}
          editable={{
            onRowAdd: (newRow: Coupon) =>
              new Promise((resolve, reject) => {
                coupons.forEach((item) => {
                  setTimeout(async () => {
                    try {
                      const response = await JwtAxios.post<Coupon>(
                        "http://localhost:8080/COMPANY/addCoupon",
                        newRow
                      );
                      myStore().store.dispatch(AddCouponAction(newRow));
                      fetchCoupons();
                      resolve(coupons);
                      notify.success("New coupon added to the system");
                    } catch (err) {
                      if(err.response.status === 500){
                        myStore().store.dispatch(logoutAuthAction())
                      }
                      notify.error(err.response.data);
                    }
                  }, 2000);
                });
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const couponId = selectedRow.couponId;
                setTimeout(async () => {
                  try {
                    const response = await JwtAxios.delete<Coupon>(
                      "http://localhost:8080/COMPANY/deleteCoupon/" + couponId
                    );
                    myStore().store.dispatch(DeleteCouponAction(selectedRow));
                    fetchCoupons();
                    resolve(coupons);
                    notify.success("Coupon deleted successfully");
                  } catch (err){
                    if(err.response.status === 500){
                      myStore().store.dispatch(logoutAuthAction())
                    }
                    notify.error(err.response.data);
                  }
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  try {
                    const response = await JwtAxios.put<Coupon>(
                      "http://localhost:8080/COMPANY/updateCoupon",
                      updatedRow
                    );
                    myStore().store.dispatch(UpdateCouponAction(updatedRow));
                    fetchCoupons();
                    resolve(coupons);
                    notify.success("Coupon was updated");
                  } catch (err){
                    if(err.response.status === 500){
                      myStore().store.dispatch(logoutAuthAction())
                    }
                    notify.error(err.response.data);
                  }
                }, 2000);
              }),
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default GetCompanyCoupons;