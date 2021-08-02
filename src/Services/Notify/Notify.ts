import {Notyf} from "notyf";

class Notify{
    private notification = new Notyf({duration: 4_000, position:{x: "center" ,y:"top"}});

    public success(message:string){
        this.notification.success(message)
    }

    public error(message:string){
        this.notification.error(message)
    }

    private extractMessage(err:any):string{
        if (typeof err === "string"){
            return err;
        }
        if (typeof err?.response?.data === "string"){
            return err.response.data[0];
        }
        if (Array.isArray(err?.response?.data)){
            return err.response.data[0];
        }
        if (typeof err?.message === "string"){
            return err.message;
        }
        return "Something went wrong !";
    }
}

const notify = new Notify();
export default notify;