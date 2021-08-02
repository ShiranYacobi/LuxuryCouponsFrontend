import { useState, useEffect } from "react";
import { ClientType } from "../../../../../Models/ClientTypeModel";
import Company from "../../../../../Models/CompanyModel";
import {
  AddCompanyAction,
  DeleteCompanyAction,
  GetAllCompaniesAction,
  UpdateCompanyAction,
} from "../../../../../Redux/AdminState";
import JwtAxios from "../../../../../Services/JwtAxios/JwtAxios";
import decodeGetType from "../../../../../Services/decodeUserType/decodeGetType";
import notify from "../../../../../Services/Notify/Notify";
import { myStore } from "../../../../../Redux/Store";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import {
  Checkbox,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { TablePagination, TablePaginationProps } from '@material-ui/core';
import { logoutAuthAction } from "../../../../../Redux/AuthState";
import MaterialTable from 'material-table';

function GetAllCompanies(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
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

  const fetchCompanies = async () => {
    try {
      if (decodeGetType() === ClientType.ADMIN) {
        const { data: companies }: { data: Company[] } = await JwtAxios.get(
          "http://localhost:8080/ADMIN/getAllCompanies"
        );
        myStore().store.dispatch(GetAllCompaniesAction(companies));
        setCompanies(companies);
      }
    } catch (err) {
      if(err.response.status === 500){
        myStore().store.dispatch(logoutAuthAction())
        }
      notify.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="getAllCompanies getAll" >
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title={<h3>COMPANIES LIST</h3>}
          data={companies}
          columns={[
            {
              title: "Name",
              field: "name",
              type: "string",
              validate: (rowData: { name: string }) =>
                rowData.name === undefined || rowData.name === ""
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
              title: "Password",
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
            onRowAdd: (newRow: Company) =>
              new Promise((resolve, reject) => {
                  setTimeout(async () => {
                    try {
                      const response = await JwtAxios.post<Company>(
                        "http://localHost:8080/ADMIN/addCompany",
                        newRow
                      );
                      myStore().store.dispatch(AddCompanyAction(newRow));
                      fetchCompanies();
                      resolve(companies);
                      notify.success("New company added to the system");
                    } catch (err) {
                      if(err.response.status === 500){
                        myStore().store.dispatch(logoutAuthAction())
                        }
                      notify.error(err.response.data);
                      resolve(companies);
                    }
                  }, 2000);
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                const companyEmail = selectedRow.email;
                setTimeout(async () => {
                  try {
                    const response = await JwtAxios.delete<Company>(
                      "http://localhost:8080/ADMIN/deleteCompany/" +
                        companyEmail
                    );
                    myStore().store.dispatch(DeleteCompanyAction(selectedRow));
                    fetchCompanies();
                    resolve(companies);
                    notify.success("Company deleted successfully");
                  } catch (err) {
                    if(err.response.status === 500){
                      myStore().store.dispatch(logoutAuthAction())
                      }
                    notify.error(err.response.data);
                    resolve(companies);
                  }
                }, 2000);
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                if (oldRow.name === updatedRow.name) {
                  setTimeout(async () => {
                    try {
                      const response = await JwtAxios.put<Company>(
                        "http://localHost:8080/ADMIN/updateCompany",
                        updatedRow
                      );
                      myStore().store.dispatch(UpdateCompanyAction(updatedRow));
                      fetchCompanies();
                      resolve(companies);
                      notify.success("Company was updated!");
                    } catch (err) {
                      if(err.response.status === 500){
                        myStore().store.dispatch(logoutAuthAction())
                        }
                      notify.error(err.response.data);
                    }
                  }, 2000);
                } else {
                  notify.error("Company name cannot be updated!");
                  resolve(companies);
                }
              }),
          }}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default GetAllCompanies;
