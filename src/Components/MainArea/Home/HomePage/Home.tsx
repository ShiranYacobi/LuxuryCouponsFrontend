import Slider from "../Slider/Slider";
import welcome from "../../../Images/welcome.gif"

function Home(): JSX.Element {
    return (
        <div className="Home" >
            <img height='auto' width='auto' className="videoWeb" src={welcome} alt= "Luxury coupons"/>
            <Slider/> 
        </div>
    );
}

export default Home;