import { NavLink } from "react-router-dom";

function CustomerMenu(): JSX.Element {
  return (
    <div className="Customer">
    <div className="col-sm-2">
      <div className="left-sidebar">
        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  data-toggle="collapse"
                  data-parent="#accordian"
                  href="#Customers"
                >
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  Menu
                </a>
              </h4>
            </div>
            <div id="Customers" className="panel-collapse collapse">
              <div className="panel-body">
                <ul>
                  <li>
                    <NavLink exact to="/getCustomerDetails">
                      Account Details
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/updateCustomer">
                      Update Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/getCustomerCoupons">
                      My Coupons
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

export default CustomerMenu;
