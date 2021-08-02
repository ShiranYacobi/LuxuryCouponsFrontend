import jwt_decode from "jwt-decode";
import { ClientType } from "../../Models/ClientTypeModel";

function DecodeUserType2(): ClientType {
    try {
        var decoded = jwt_decode(JSON.parse(localStorage.getItem("user")));
        var decodedString = JSON.stringify(decoded)
    } catch (err) {
        console.log(err);
    }
    if (decodedString.includes(ClientType.ADMIN)) {
        return ClientType.ADMIN
    }
    if (decodedString.includes(ClientType.COMPANY)) {
        return ClientType.COMPANY
    }
    if (decodedString.includes(ClientType.CUSTOMER)) {
        return ClientType.CUSTOMER
    }
    return null;
}

export default DecodeUserType2;
