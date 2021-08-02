import { NavLink } from "react-router-dom";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <div className="single-widget">
        <NavLink exact to="/contactUs">
          Contact Us
        </NavLink>
      </div>
      <div className="footer-bottom">
        <div className="container">
          Copyright ©️ 2021 Luxury Coupons-Shop Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;