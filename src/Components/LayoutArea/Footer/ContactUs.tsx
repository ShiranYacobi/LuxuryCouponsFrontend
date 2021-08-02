import { Button } from "@material-ui/core";
import notify from "../../../Services/Notify/Notify";

function ContactUs(): JSX.Element {

    return (
        <div className="ContactUs Box">
            <h2><b>Contact Us</b></h2><br />
            <form action="/home">
                <label>Full Name</label><br />
                <input type="text" placeholder="Enter your full name" /><br />
                <label>Email</label><br />
                <input type="email" placeholder="Enter your email" /><br />
                <label>Enter comments</label><br />
                <textarea id="subject"></textarea><br /><br />
                <Button variant="outlined" size="large" onClick={()=>{
                    notify.success("Thank you! we will be in touch!")
                }}>Submit</Button>
            </form>
        </div >
    );
}

export default ContactUs;