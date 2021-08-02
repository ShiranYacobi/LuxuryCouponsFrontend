import { NavLink } from "react-router-dom";

function AdminMenu(): JSX.Element {
  
  return (
    <div className="AdminMenu">
      <div className="col-sm-2">
        <div className="left-sidebar ">
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <h2>Menu</h2>
                  <a data-toggle="collapse" data-parent="#accordian" href="#Companies">
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Companies
                  </a>
                </h4>
              </div>
              <div id="Companies" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <NavLink exact to="/getAllCompanies">
                        Companies List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a data-toggle="collapse" data-parent="#accordian" href="#Customers">
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Customers
                  </a>
                </h4>
              </div>
              <div id="Customers" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <NavLink exact to="/getAllCustomers">
                        Customers List
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
