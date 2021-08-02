import { NavLink } from 'react-router-dom';
import logo_image from '../../Images/logo_no_background.png';
import { useSelector } from 'react-redux';
import { myStore } from '../../../Redux/Store';

function Header(): JSX.Element {
  useSelector(myStore().store.getState);
  let isLogged = () => {
    if (myStore().store.getState().authState.isLogged) {
      return <NavLink exact to="/logout">
        logout
      </NavLink>
    } else {
      return <NavLink exact to="/login">
        Login
      </NavLink>
    }
  }

  let signUp = () => {
    if (!(myStore().store.getState().authState.isLogged)) {
      return <NavLink exact to="/register"> Sign Up</NavLink>
    }
  }

  return (
    <div className="Header">
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-sm-11">
              <div className="social-icons contactinfo pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="https://www.facebook.com/shiran.yacobi1"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="https://www.linkedin.com/in/shiran-yacobi/"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="mailto:shiranyacobi1@gmail.com"><i className="fa fa-envelope"></i> shiranyacobi1@gmail.com</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="mainmenu ">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li><a>
                    <NavLink exact to="/home">
                      Home
                    </NavLink></a></li>
                  <li><a>
                    {isLogged()}
                  </a></li>
                  <li><a>
                    {signUp()}
                  </a></li>
                  <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down"></i></a>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <NavLink exact to="/store">Coupons</NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
                <img src={logo_image}height="150" width="150" alt="logo"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Header;