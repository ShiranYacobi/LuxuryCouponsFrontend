import { NavLink } from "react-router-dom";
import logoGiff from "../../../Images/Lgiff.gif"
import daniel from "../../../Images/Daniel.jpg"
import shiran from "../../../Images/Shiran.jpg"
import noam from "../../../Images/Noam.jpg"
import programing from "../../../Images/programing.png"
import girlImage from "../../../Images/girl3.jpg"


function Slider():JSX.Element{
    return( 
    <div className="slider">
      <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div id="slider-carousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#slider-carousel" data-slide-to="/register" className="active"></li>
              <li data-target="#slider-carousel" data-slide-to="1"></li>
              <li data-target="#slider-carousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="item active">
                <div className="col-sm-6">
                  <h1><span>ABOUT</span> US</h1>
                  <p>Luxury Coupons site is an online shop which provides it's services <br/>to both 
                  companies and customers.<br />
                  Companies that would like to extend their services <br/> and client audience 
                  are offered a platform for promoting deals <br/>and coupons as they please. <br/>
                  The site is designed in a comfortable and easy way to use <br/> so they can generate 
                  and manage coupons,<br/> as part of advertising and marketing campaigns. <br /><br/>
                  Registered customers can purchase coupons from <br/>
                  various companies suggested directly from our site.<br /><br /><br/><br/><br/> </p>
                </div>
                <div className="col-sm-6">
                  <br/><br/><br/><br/><br/>
                  <img height="300" width="300" src={logoGiff} alt=""/>
                </div>
              </div>
              <div className="item us">
                <div className="col-sm-6">
                  <h1><span>THE</span> CREATORS</h1>
                  <p>
                    This site is a developer site,<br/> 
                    which is a part of a final project in Full Stack Development course, therefore the system is build in both client and server side.<br/>
                    Our goal was to create a website that demonstrates our capabilities with an emphasis on 
                    aesthetic design and a comfortable-smart system. <br/>
                    We are three passionate developers, eager to learn and grow in the development industry.
                    <br/><br/> To go to our linkedin page, press our picture
                  </p> 
                    <a href= "https://www.linkedin.com/in/noam-dadon-323140128/"><img height="100" width="100" src={noam} alt="" /></a> 
                    <a href= "https://www.linkedin.com/in/daniel-peretz93/"><img height="100" width="100" src={daniel} alt=""/></a> 
                    <a href= "https://www.linkedin.com/in/shiran-yacobi/">< img height="100" width="100" src={shiran} alt=""/></a>  <br/><br/>
                </div>
                <div className="col-sm-6">
                  <br/><br/><br/><br/>
                  <img src={programing} height="400" width="400" alt=""/>
                </div>
              </div>
              <div className="item ">
                <div className="col-sm-6">
                  <h1><br/><span>SIGN</span>-UP</h1>
                  <h2>Join our community today!</h2>
                  <p><br/>Enjoy major discounts and great deals with the luxurious companies suggested on our site.<br/> We will help you save your money!<br/></p>
                  <NavLink to="/register" className="btn btn-default get">Sign up</NavLink><br/><br/>
                </div>
                <div className="col-sm-6">
                  <img src={girlImage} className="girl img-responsive" alt="" />
                </div>
              </div>
              
            </div>
            
            <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
              <i className="fa fa-angle-left"></i>
            </a>
            <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
              <i className="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
}
export default Slider;