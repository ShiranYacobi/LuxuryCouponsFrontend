import { NavLink } from "react-router-dom";

function CompanyMenu(): JSX.Element {
  return (
    <div className="Admin">
      <div className="col-sm-2">
        <div className="left-sidebar">
          <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordian"
                    href="#Companies"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus"></i>
                    </span>
                    Menu
                  </a>
                </h4>
              </div>
              <div id="Companies" className="panel-collapse collapse">
                <div className="panel-body">
                  <ul>
                    <li>
                      <NavLink exact to="/getCompanyDetails">
                        Account Details
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/addCoupon">
                        Add Coupon
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/getCompanyCoupons">
                        Coupons List
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

export default CompanyMenu;
