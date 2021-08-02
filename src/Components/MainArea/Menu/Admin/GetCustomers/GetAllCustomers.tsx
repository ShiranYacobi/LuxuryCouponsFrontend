import { useEffect, useState } from "react";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Customer from "../../../../../Models/CustomerModel";
import {
  DeleteCustomerAction,
  GetAllCustomersAction,
  UpdateAdminCustomerAction,
} from "../../../../../Redux/AdminState";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import notify from "../../../../../Services/Notify/Notify";
import { myStore } from "../../../../../Redux/Store";
import {
  Checkbox,
  createMuiTheme,
  MuiThemeProvider,
  TablePagination,
  TablePaginationProps,
} from "@material-ui/core";
import MaterialTable from "material-table";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { logoutAuthAction } from "../../../../../Redux/AuthState";

function GetAllCustomers(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [preferDarkMode, setPreferDarkMode] = useState(false);
  const [filter, setFilter] = useState(false);
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

  const fetchCustomers = async () => {
    try {
      if (decodeGetType() === ClientType.ADMIN) {
        const { data: customers }: { data: Customer[] } = await JwtAxios.get(
          "http://localHost:8080/ADMIN/getAllCustomers"
        );
        myStore().store.dispatch(GetAllCustomersAction(customers));
        setCustomers(customers);
      }
    } catch (err) {
      if(err.response.status === 500){
        myStore().store.dispatch(logoutAuthAction())
        }
      notify.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="getAllCustomers getAll">
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={<h3>CUSTOMERS LIST</h3>}
          data={customers}
          columns={[
            {
              title: "First Name",
              field: "firstName",
              type: "string",
              validate: (rowData: { firstName: string }) =>
                rowData.firstName === undefined || rowData.firstName === ""
                  ? "Required"
                  : true,
            },
            {
              title: "Last Name",
              field: "lastName",
              type: "string",
              validate: (rowData: { lastName: string }) =>
                rowData.lastName === undefined || rowData.lastName === ""
                  ? "Required"
                  : true,
            },
            {
              title: "Email",
              field: "email",
              type: "string",
              validate: (rowData) => {
                if (rowData.email === undefined || rowData.email === "") {
                  return "Required";
                } else if (!rowData.email.includes("@" && ".")) {
                  return "Enter valid address";
                }
                return true;
              },
            },
            {
              title: "password",
              field: "password",
              type: "string",
              validate: (rowData: { password: string }) =>
                rowData.password === undefined || rowData.password === ""
                  ? "Required"
                  : true,
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
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const companyEmail = selectedRow.email;
                setTimeout(async () => {
                  try {
                    const response = await JwtAxios.delete<Customer>(
                      "http://localhost:8080/ADMIN/deleteCustomer/" +
                        companyEmail
                    );
                    myStore().store.dispatch(DeleteCustomerAction(selectedRow));
                    fetchCustomers();
                    resolve(customers);
                    notify.success("Customer deleted successfully");
                  } catch (err) {
                    if(err.response.status === 500){
                      myStore().store.dispatch(logoutAuthAction())
                      }
                    notify.error(err.response.data);
                  }
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                if (oldRow.customerId === updatedRow.customerId) {
                  setTimeout(async () => {
                    try {
                      const response = await JwtAxios.put<Customer>(
                        "http://localhost:8080/ADMIN/adminUpdateCustomer",
                        updatedRow
                      );
                      myStore().store.dispatch(
                        UpdateAdminCustomerAction(updatedRow)
                      );
                      fetchCustomers();
                      resolve(customers);
                      notify.success("Customer was updated !");
                    } catch (err) {
                      if(err.response.status === 500){
                      myStore().store.dispatch(logoutAuthAction())
                      }
                      notify.error(err.response.data);
                    }
                  }, 2000);
                } else {
                  notify.error("Something went wrong, please try again !");
                }
              }),
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default GetAllCustomers;
